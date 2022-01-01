from functools import lru_cache

import requests

from app.config import settings

@lru_cache()
def get_usd():
    URL_CONVERTER = f'{settings.URL_CONVERTER}{settings.API_KEY_CONVERTER}'

    converter_response = requests.get(URL_CONVERTER).json()

    USD = converter_response.get('IDR_USD')

    return USD