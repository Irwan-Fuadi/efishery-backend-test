from fastapi import Request

from app.utils.response import JsonResponse
from app.utils.token import get_payload


async def get_private_claims(request: Request):
    authorization: str = request.headers.get('Authorization')

    data = get_payload(authorization)

    return JsonResponse(data=data)
