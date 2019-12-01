# -*- coding: utf-8
"""Utilities for and around terminals

namely terminal capablities via Curses and text wrapping.
"""

__all__ = ('try_input', 'termwrap', 'TERMMODES')

import os
import sys
import errno
import weakref
import textwrap
import collections.abc
from . import io
from operator import itemgetter
from .operator import methodcaller
from .itertools import accumulate, foreach
from functools import partial as fpartial


TERMMODES = (('bold', 'bold'), ('underline', 'smul'), ('normal', 'sgr0'))

if io.isatty(sys.stdout):
	try:
		import curses
		curses.setupterm()
	except (ImportError, OSError) as ex:
		if __debug__:
			print('Warning', ex, sep=': ', end='\n\n', file=sys.stderr)
		curses = None
else:
	curses = None

if curses is None:
	TERMMODES = dict.fromkeys(map(itemgetter(0), TERMMODES), '')
else:
	TERMMODES = {
		k: (curses.tigetstr(capname) or b'').decode('ascii')
		for k, capname in TERMMODES
	}


def try_input(prompt=None, on_eof='', end=None):
	"""Similar to input() but return a default response on EOF or EBADF.

	If input() fails with EOFError or due to a bad (e. g. closed) standard output
	stream return 'on_eof' instead which defaults to the empty string.

	Additionally wrap the prompt string using termwrap (see below). 'end' is
	always appended to the prompt and defaults to '\n? '.
	"""

	if end is None:
		end = '\n? '

	if prompt:
		termwrap.stdout().print(prompt, end=end)
		end = None

	if sys.stdin and not sys.stdin.closed:
		try:
			return input(end)
		except (EOFError, KeyboardInterrupt):
			pass
		except EnvironmentError as ex:
			if ex.errno != errno.EBADF:
				raise

	return on_eof


class termwrap(textwrap.TextWrapper):
	"""Text wrapping for terminal output"""

	_instances = {}


	@classmethod
	def get(cls, file=None, use_weakref=True, ignore_errors=True):
		"""Retrieves a termwrap instance for the given file object.

		Missing instances are created on demand using weak references unless
		'use_weakref' is False. Errors during terminal size detection are
		suppressed unless 'ignore_errors' is False.

		'file' defaults to None which is equivalent to the current value of
		sys.stdout.
		"""

		if file is None:
			file = sys.stdout
			if file is None:
				return None

		tw = cls._instances.get(id(file))
		if isinstance(tw, weakref.ref):
			tw = tw()

		if tw is None:
			try:
				tw = cls(file)
			except EnvironmentError:
				if not ignore_errors:
					raise
				tw = cls()
				tw.file = file
			cls._instances[id(file)] = weakref.ref(tw) if use_weakref else tw

		return tw


	@classmethod
	def stdout(cls):
		"""Convenience method for get(sys.stdout)"""
		return cls.get(sys.stdout, False)

	@classmethod
	def stderr(cls):
		"""Convenience method for get(sys.stderr)"""
		return cls.get(sys.stderr, False)


	def __init__(self, file=None, width=0, **kwargs):
		"""Initialize with the given parameters as with textwrap.TextWrapper.

		If 'file' is not None and 'with' < 0 the width is initialized to the
		current terminal width if available.
		"""

		if file is not None and width <= 0:
			width = self._refresh_width_impl(file)
		super().__init__(width=width, **kwargs)
		self.file = file


	def print(self, paragraph, end='\n', return_last_line_len=False):
		"""Prints a paragraph to the stored file object."""
		if self.file is None:
			raise TypeError
		if self.width > 0:
			paragraph = self.wrap(paragraph)
		else:
			assert isinstance(paragraph, str)
			paragraph = (paragraph,)

		print(*paragraph, sep='\n', end=end, file=self.file)

		if return_last_line_len:
			return self._get_last_line_len(paragraph[-1], end)


	def print_all(self, paragraphs, end='\n', sep='\n\n',
		return_last_line_len=False
	):
		"""Prints a sequence of paragraph to the stored file object."""
		if self.file is None:
			raise TypeError
		if self.width > 0:
			paragraphs = map(self.fill, paragraphs)
		if return_last_line_len:
			paragraphs = tuple(paragraphs)

		print(*paragraphs, sep=sep, end=end, file=self.file)

		if return_last_line_len:
			return self._get_last_line_len(paragraphs[-1], end)


	@staticmethod
	def _get_last_line_len(*parts):
		n = 0
		for n, p in zip(
			accumulate(map(len, reversed(parts))),
			map(methodcaller(str.rfind, '\n'), reversed(parts))
		):
			if p >= 0:
				return n - p - 1
		return n


	def refresh_width(self, file=None):
		"""Sets the wrapping width to the current width of the associated terminal.

		If the associated file descriptor does not report a terminal width the
		current width value is retained.
		"""
		if file is None:
			file = self.file
		width = self._refresh_width_impl(file)
		if width > 0:
			self.width = width
		return width > 0


	@staticmethod
	def _refresh_width_impl(file):
		return file.isatty() and os.get_terminal_size(file.fileno()).columns


	def copy(self, **kwargs):
		foreach(kwargs.setdefault, self._attribute_items(), star_call=True)
		return type(self)(**kwargs)


	def _attribute_items(self,
		mandatory_attrs=(
			'break_long_words', 'break_on_hyphens', 'drop_whitespace',
			'expand_tabs', 'fix_sentence_endings', 'initial_indent',
			'replace_whitespace', 'subsequent_indent', 'width', 'file'),
		optional_attrs=(
			'max_lines', 'placeholder', 'tabsize')
	):
		assert isinstance(mandatory_attrs, collections.abc.Sized)
		self_getattr = fpartial(getattr, self)
		yield from zip(mandatory_attrs, map(self_getattr, mandatory_attrs))

		for k in optional_attrs:
			try:
				yield (k, self_getattr(k))
			except AttributeError:
				pass
