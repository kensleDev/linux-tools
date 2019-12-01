# -*- coding: utf-8
__all__ = ('get_version', 'version_info')

import sys
import os.path
import datetime
from functools import partial as fpartial
from .. import strings

if __debug__:
	import inspect


class version_info:
	"""A version info object

	Attributes:
	  * version - an arbitrary version string
	  * commit - a string with a human-readable represenation of a revision
	       control system commit identifier
	  * date - a datetime.date (usually even datetime.datetime) instance
	  * branch_name - a name of the RCS branch used to build the denoted release
	       version

	All attributes are optional.
	"""

	__slots__ = ('version', 'date', 'commit', 'branch_name')


	def __init__(self, version, date=None, commit=None, branch_name=None):
		self.version = version
		self.date = date
		self.commit = commit
		self.branch_name = branch_name


	def items(self):
		"""Returns the attributes as a sequence of name-value tuples"""
		return zip(*self._item_iters())


	def _item_iters(self):
		return (self.__slots__, map(fpartial(getattr, self), self.__slots__))


	def __repr__(self):
		return '{0.__module__:s}.{0.__qualname__:s}({1:s})'.format(
			type(self),
			', '.join(map('='.join, zip(self.__slots__,
				map(repr, map(fpartial(getattr, self), self.__slots__))))))


	def __str__(self):
		v = [str(self.version)]

		if self.date:
			v.append(self.date.strftime('%Y-%m-%d'))

		if self.commit:
			v.append(':'.join(filter(None, (self.commit[:7], self.branch_name))))

		return ' '.join(v)


	@classmethod
	def load(cls):
		"""Load a version object from environment information.

		Tries to load or construct version information based on the environment in
		the following order:

		 1. using the attributes of the ._data module (relative to this module),
		 2. the first line of the 'VERSION' file located two directory levels above
		    the module search path root for this module or package for the 'version'
		    attribute only,
		 3. from 'from_repo(version)'.
		"""

		try:
			from . import _data
		except ImportError:
			pass
		else:
			return cls(
				*map(fpartial(getattr, _data), cls.__slots__))

		version_file = os.path.join(
			os.path.dirname(os.path.dirname(os.path.dirname(
				__import__(strings.prefix(__package__ or __name__, '.')).__file__))),
			'VERSION')
		try:
			version_file = open(version_file)
		except FileNotFoundError:
			version = None
		else:
			with version_file:
				version = version_file.readline(1024).strip()

		return cls.from_repo(version)


	@classmethod
	def from_repo(cls, version=None, repo_dir=None):
		"""Construct a version_info using the current state of a Git repository"""

		try:
			import git
		except ImportError:
			repo = None
		else:
			try:
				repo = git.Repo(repo_dir)
			except git.exc.InvalidGitRepositoryError:
				repo = None

		if repo is None:
			if version is None:
				raise RuntimeError('No version information available')
			return cls(version)

		commit = repo.commit()
		branch = next((h.name for h in repo.heads if h.commit == commit), None)
		date = commit.committed_datetime.astimezone(
			datetime.timezone(commit.committed_datetime.utcoffset()))
		return cls(version, date, commit.hexsha, branch)


	def _print_data_module(self, file=None):
		if file is None:
			file = sys.stdout

		names, values = self._item_iters()
		print(
			'# -*- coding: ' + file.encoding.lower(),
			'import datetime\n',
			*map(' = '.join, zip(names, map(repr, values))),
			sep='\n', file=file)


	assert __slots__ == tuple(inspect.signature(__init__).parameters.keys())[1:]


_version = None

def get_version():
	"""Return the current version info.

	The first call to this function will call version_info.load() and cache the
	result for later calls.
	"""

	global _version
	if _version is None:
		_version = version_info.load()
	return _version
