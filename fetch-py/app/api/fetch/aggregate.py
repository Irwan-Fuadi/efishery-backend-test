from itertools import groupby
from collections import defaultdict
from fastapi import HTTPException, Request

from app.utils.response import JsonResponse
from app.utils.resource import get_area_provinsi, get_resource


async def get_aggregate(request: Request):
    if request.state.payload.get('role') != 'admin':
        raise HTTPException(status_code=403, detail="You don't have access")

    result = get_resource()

    INFO = sorted(result, key=get_area_provinsi)

    data = defaultdict(lambda: [])

    for key, value in groupby(INFO, get_area_provinsi):
        if key != '':
            data[key] = list(value)

    return JsonResponse(data=data)
