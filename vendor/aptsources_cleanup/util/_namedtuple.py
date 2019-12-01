# -*- coding: utf-8
"""A drop-in replacement for collections.namedtuple

...that relies on parametrised sub-classing instead of on-the-fly code
generation.
"""

__all__ = ('namedtuple', 'NamedTupleBase')

import sys
import keyword
import collections


### namedtuple() and its parts methods ################################

def namedtuple(type_name, fields, rename=False, module_name=None,
	type_doc=None, *, verbose=False
):
	t = type(type_name, NamedTupleBase._bases,
		_build_field_properties(fields, rename, verbose, { '__doc__': type_doc }))

	i = t.__name__.rfind('.')
	if i >= 0:
		t.__name__ = t.__name__[i+1:]
	if module_name is not None and module_name != t.__module__:
		t.__module__ = module_name

	return t


def _build_field_properties(fields, rename, verbose, namespace=None):
	if not isinstance(fields, tuple):
		fields = fields.split() if isinstance(fields, str) else list(fields)
	if not fields:
		raise ValueError('No field names specified')

	if namespace is None:
		namespace = {}
	namespace.setdefault('__slots__', ())

	for i in range(len(fields)):
		name, field_doc = _get_field_name_from_spec(i, fields[i])
		field_prop, name_is_legal = _make_field_prop(i, name, rename, field_doc)
		if not (name_is_legal and _dict_add_checked(namespace, name, field_prop)):
			name = _handle_rename(i, name, rename, verbose)
			_dict_add_new(namespace, name, field_prop)
		if name is not fields[i]:
			fields = _coerce_type(fields, list)
			fields[i] = name

	_dict_add_new(namespace, '_fields', fields)
	return namespace


def _get_field_name_from_spec(i, name):
	if isinstance(name, str):
		return name, None

	try:
		if len(name) == 2:
			return name
	except TypeError:
		pass

	try:
		name, field_doc = name
	except (TypeError, ValueError):
		raise TypeError(
			'Field names must be strings or 2-tuples of strings '
			'(got {:s} at index {:d})'
				.format(_format_type(type(name)), i))

	return name, field_doc


def _make_field_prop(i, name, rename, field_doc):
	name_is_legal = (name.isidentifier() and
		not (name.startswith('_') or keyword.iskeyword(name)))
	if not (name_is_legal or rename):
		return None, False
	return NamedTupleProperty(i, name, field_doc), name_is_legal


def _handle_rename(i, name, rename, verbose):
	if rename:
		rename = '_' + format(i, 'd')
	if verbose or not rename:
		error = (
			'Invalid or duplicate namedtuple field name {!r} at index {:d}'
				.format(name, i))
		if not rename:
			raise ValueError(error)
		print(
			"Warning: {:s} renamed to '{:s}'.".format(error, rename),
			file=sys.stderr)
	return rename


### NamedTupleBase ####################################################

class NamedTupleBase(tuple):
	"""Base class for named tuples"""

	__slots__ = ()

	_fields = None

	count = index = None


	def __new__(cls, *args, **kwargs):
		"""Creates a new named tuple instance

		...based on either positional or key-word arguments. If instantiated from
		positional arguments, the argument count must match the field count. If
		instantiated from key-word arguments, the key set must match the field
		name set.
		"""
		if not kwargs:
			return cls._make_impl(args, None)
		if not args:
			return cls._fromdict(kwargs, TypeError)
		raise TypeError(_format_type(cls) +
			'() accepts either positional or key-word arguments but not both')


	@classmethod
	def _make(cls, iterable):
		"""Create a new named tuple instance using the content of an iterable"""
		if type(iterable) is cls:
			return iterable
		return cls._make_impl(iterable, '_make')


	@classmethod
	def _make_impl(cls, iterable, entry_method_name):
		cls._check_abstract()
		iterable = super().__new__(cls, iterable)
		if len(iterable) != len(cls._fields):
			if entry_method_name is None:
				error_type = TypeError
				entry_method_name = _format_type(cls)
			else:
				error_type = ValueError
				entry_method_name = '.'.join((_format_type(cls), entry_method_name))
			raise error_type(
				'{0:s}() expect {2:d} fields, got {1:d} instead'
					.format(entry_method_name, len(iterable), len(cls._fields)))
		return iterable


	@classmethod
	def _fromdict(cls, kwargs, _error_type=ValueError):
		cls._check_abstract()
		try:
			self = super().__new__(cls, map(kwargs.__getitem__, cls._fields))
		except KeyError as ex:
			raise _error_type('Missing field: ' + ex.args[0])
		if len(self) != len(kwargs):
			raise _error_type(
				'Unknown field(s): ' +
					', '.join(map(_format_name, kwargs.keys() - frozenset(cls._fields))))
		return self


	@classmethod
	def _check_abstract(cls):
		if cls._fields is None:
			raise NotImplementedError(
				_format_type(cls) + ' is an abstract base type')


	def __dir__(self):
		return self._fields


	def __repr__(self):
		return '{:s}({:s})'.format(
			type(self).__qualname__,
			', '.join(map('='.join, zip(self._fields, map(repr, self)))))


	def _items(self):
		"""Returns an iterator over the tuples of name-value pairs

		of this named tuple in order.
		"""
		return zip(self._fields, self)


	def _asdict(self, ordered=False):
		"""Returns the name-value pairs of this named tuple as a dictionary.

		If 'ordered' is true, the returned dictionary will be ordered according to
		the field order.
		"""
		return (collections.OrderedDict if ordered else dict)(self._items())


	def _replace(self, **kwargs):
		"""Returns a new named tuple with the given named values replaced."""
		if not kwargs:
			return self

		rv = super().__new__(type(self), map(kwargs.pop, self._fields, self))
		if kwargs:
			raise ValueError('Unknown field(s): ' + ', '.join(kwargs))
		return rv


NamedTupleBase._bases = (NamedTupleBase,)


### NamedTupleProperty ################################################

class NamedTupleProperty:
	"""A property class for named tuple properties"""

	def __init__(self, index, name=None, doc=None):
		self.index = index
		self.name = name
		self.__doc__ = doc

	def __get__(self, _tuple, _type=None):
		return self if _tuple is None else _tuple[self.index]


### Various utility methods ###########################################

def _dict_add_checked(d, key, value):
	"""Add a dictionary key only if it doesn't exist yet.

	Returns whether the dictionary was modified.
	"""
	return d.setdefault(key, value) is value


def _dict_add_new(d, key, value):
	"""Add a dictionary key only if it doesn't exist yet.

	Raises a KeyError if it exists already.
	"""
	rv = d.setdefault(key, value)
	if rv is not value:
		raise KeyError(
			'Key {!r} already exists (value: {!r})'.format(key, rv))
	return value


def _format_type(_type, hide_builtins=True, hide_main=True, hide_modules=()):
	"""Format a type as module (if any) and qualified name separated by a dot.

	The module name may be suppressed if it is the 'builtins' (the default) or
	any specified module.
	"""
	if ((hide_builtins and _type.__module__ == 'builtins')
		or (hide_main and _type.__module__ == '__main__')
		or _type.__module__ in hide_modules
	):
		return _type.__qualname__

	return '.'.join((_type.__module__, _type.__qualname__))


def _format_name(name):
	try:
		if name.isidentifier():
			return name
	except AttributeError:
		raise TypeError(
			'Names must be strings but got ' + _format_type(type(name)))
	return repr(name)


def _coerce_type(obj, _type):
	"""Casts an object to a type unless it is already of that type."""
	return obj if isinstance(obj, _type) else _type(obj)


class map_length_hint(map):

	__slots__ = ('__len__',)

	def __init__(self, func, *iterables):
		super().__init__(func, *iterables)
		try:
			length = min(map(len, iterables))
		except TypeError:
			pass
		else:
			def __len__(): return length
			self.__len__ = __len__


### StrReprDict #######################################################

import itertools


class LazyInstanceDict(collections.defaultdict):

	__slots__ = ()

	def __missing__(self, key):
		return self.default_factory(key)


class StrReprDict:

	__slots__ = ('quote_char', 'quote_replacement', 'empty_repr')

	escape = '\\'

	quotes = ("'", '"')

	escape_formats = tuple(zip(('x', 'u', 'U'),
		map('0{:d}x'.format, map((2).__lshift__, itertools.count()))))

	default_shorthands = dict(
		enumerate(map(escape.__add__, 'abtnvfr'), ord('\a')))
	default_shorthands[ ord(escape) ] = escape * 2


	def __init__(self, quote_char):
		if isinstance(quote_char, int):
			self.quote_char = quote_char
			quote_char = chr(quote_char)
		else:
			self.quote_char = ord(quote_char)
		self.quote_replacement = self.escape + quote_char
		self.empty_repr = quote_char * 2


	def __contains__(self, ordinal):
		return (
			ordinal == self.quote_char or
			ordinal in self.default_shorthands or
			not chr(ordinal).isprintable())


	def get(self, ordinal, default=None):
		if ordinal == self.quote_char:
			return self.quote_replacement

		c = self.default_shorthands.get(ordinal)
		if c is not None:
			return c

		if chr(ordinal).isprintable():
			return default

		c, fmt = self.escape_formats[
			max((ordinal.bit_length() >> 3).bit_length() - 1, 0) ]
		return self.escape + c + format(ordinal, fmt)


	def __getitem__(self, ordinal):
		c = self.get(ordinal)
		if c is None:
			raise KeyError(ordinal)
		return c


	def strrepr(self, s):
		if not s:
			return self.empty_repr
		return '{1:c}{0:s}{1:c}'.format(s.translate(self), self.quote_char)


StrReprDict._instances = LazyInstanceDict(StrReprDict)


def strrepr(s):
	return StrReprDict._instances[ min(StrReprDict.quotes, key=s.count) ].strrepr(s)
