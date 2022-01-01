import os
from functools import lru_cache

from pydantic import BaseSettings


class Settings(BaseSettings):
    DEBUG: bool = False
    PORT: int
    SECRET_KEY: str
    ENABLE_API_DOCS: bool

    AUTH_TOKEN_EXPIRATION: int = 3 * 60 * 60

    # uvicorn config
    RELOAD: bool

    RESOURCE_URL: str
    URL_CONVERTER: str
    API_KEY_CONVERTER: str

    class Config:
        env_file = os.environ.get('ENV_FILE', '.env')
        env_file_encoding = 'utf-8'


@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()
