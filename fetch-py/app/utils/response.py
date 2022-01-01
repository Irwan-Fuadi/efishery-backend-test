import typing
from fastapi.responses import JSONResponse as response_json


def JsonResponse(data: typing.Any = None, message: str = 'Success', status_code: int = 200, meta=None,
                 code: int = None, success: bool = True):
    if meta is None:
        meta = {}

    if code is None:
        code = status_code

    return response_json(
        {
            'data': data,
            'message': message,
            'code': code,
            'meta': meta,
            'success': success
        },
        status_code=status_code
    )
