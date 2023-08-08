from os import environ


def is_env_true(key: str, default: bool = False) -> bool:
    value = environ.get(key, str(default)).lower()
    return value in ("1", "true", "y", "yes")