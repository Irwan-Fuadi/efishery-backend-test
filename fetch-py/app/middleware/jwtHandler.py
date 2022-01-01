import jwt
from fastapi import HTTPException, Request
from fastapi.security import HTTPBearer
from fastapi.security.utils import get_authorization_scheme_param

from app.utils.token import get_payload


class Verify(HTTPBearer):
    def __init__(self, login_required: bool = False):
        super(Verify, self).__init__()
        self.login_required = login_required

    async def __call__(self, request: Request):
        authorization: str = request.headers.get('Authorization')

        scheme, credentials = get_authorization_scheme_param(authorization)

        if not scheme and not credentials:
            if not self.login_required:
                request.state.payload = None
                return credentials

            raise HTTPException(status_code=403, detail='Unauthorized')

        if credentials == '':
            scheme, credentials = 'Bearer', scheme

        try:
            request.state.payload = get_payload(credentials, raise_error=True)
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=402, detail='Token Expired')
        except (jwt.InvalidSignatureError, jwt.InvalidTokenError, jwt.DecodeError) as e:
            raise HTTPException(status_code=401, detail='Token Invalid')

        return credentials
