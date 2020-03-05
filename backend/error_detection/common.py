from collections import namedtuple


# correction may be None if no correction could be found.
Error = namedtuple("Error", "field, correction, message")