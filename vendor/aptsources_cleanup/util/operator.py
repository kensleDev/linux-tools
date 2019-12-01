# -*- coding: utf-8

__all__ = ('identity', 'rapply', 'methodcaller', 'starcall')

import operator


def identity(x):
	"""Returns its attribute"""
	return x


def rapply(arg, func):
	"""Calls 'func(arg)' and returns its return value."""
	return func(arg)


class methodcaller:
	"""Binds arguments for instance(-like) method calls.

	Instances of this class are callable and pass their single positional
	argument as the first positional argument to the wrapped function followed by
	the other arguments given during instantiation."""

	__slots__ = ('func', 'args')


	def __new__(cls, func, *args):
		if not callable(func):
			return operator.methodcaller(func, *args)
		return super().__new__(cls)


	def __init__(self, func, *args):
		self.func = func
		self.args = args


	def __call__(self, obj):
		return self.func(obj, *self.args)


def starcall(func, args):
	"""Calls 'func' with variable arguments.

	Useful to create partial function objects that accept variadic arguments when
	used in contexts that don't expect it."""

	return func(*args)


def peek(func, *args):
	"""Calls func with the given arguments and returns _the first argument_."""

	if not args:
		raise TypeError('Need at least 2 arguments; got 1')
	func(*args)
	return args[0]
