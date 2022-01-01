from app.utils.response import JsonResponse
from app.utils.resource import get_resource


async def get_list():
    result = get_resource()
    return JsonResponse(data=result)
