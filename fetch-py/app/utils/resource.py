from functools import lru_cache

import requests

from app.config import settings
from app.utils.converter import convert_datetime_timezone_to_datetime
from app.utils.converter_price import get_usd


@lru_cache()
def get_resource():
    resource_response = requests.get(settings.RESOURCE_URL).json()

    USD = get_usd()

    result = []

    for item in resource_response:
        if item.get('price') is not None:
            result.append({
                'uuid': item.get('uuid'),
                'komoditas': item.get('komoditas'),
                'area_provinsi': item.get('area_provinsi'),
                'area_kota': item.get('area_kota'),
                'size': item.get('size'),
                'price': item.get('price'),
                'price_usd': float(item.get('price')) * float(USD),
                'tgl_parsed': convert_datetime_timezone_to_datetime(item.get('tgl_parsed')),
                'timestamp': item.get('timestamp')
            })

    return result


def get_area_provinsi(k):
    x = k.get('area_provinsi', '')
    if not x:
        x = ''

    return x
