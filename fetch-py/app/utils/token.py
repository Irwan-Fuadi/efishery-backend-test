import jwt

from app.config import settings


def decode_jwt(token: str, check_expiration: bool = True):
    payload = jwt.decode(token, algorithms='HS256', key=settings.SECRET_KEY, verify_expiration=check_expiration)
    return payload

def get_payload(token: str, check_expiration: bool = True, raise_error: bool = True):
    try:
        payload = decode_jwt(token, check_expiration=check_expiration)
    except jwt.exceptions.PyJWTError as e:
        if raise_error:
            raise e

        return None
    return payload
