from fastapi import Depends
from fastapi.responses import PlainTextResponse
from fastapi.routing import APIRoute

from app.api.fetch.private_claims import get_private_claims
from app.api.fetch.aggregate import get_aggregate
from app.api.fetch.list import get_list
from app.version import API_VERSION
from app.middleware.jwtHandler import Verify

prefix = f'/api/{API_VERSION}'


def alive():
    return 'Alive'


routes = [
    APIRoute(f'{prefix}/fetch/alive', endpoint=alive, tags=['Status'], response_class=PlainTextResponse,
             response_description='Check Endpoint Status'),

    APIRoute(f'{prefix}/fetch/', endpoint=get_list, tags=['Fetch'],
             response_class=PlainTextResponse, dependencies=[Depends(Verify())]),
    APIRoute(f'{prefix}/fetch/aggregate', endpoint=get_aggregate, tags=['Fetch'],
             response_class=PlainTextResponse, dependencies=[Depends(Verify())]),
    APIRoute(f'{prefix}/fetch/private', endpoint=get_private_claims, tags=['Fetch'],
             response_class=PlainTextResponse, dependencies=[Depends(Verify())]),
]
