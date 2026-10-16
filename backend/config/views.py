from django.http import JsonResponse
from pymongo.errors import PyMongoError

from .mongodb import check_mongo_connection


def health(request):
    try:
        check_mongo_connection()
    except (PyMongoError, RuntimeError) as error:
        return JsonResponse(
            {"status": "error", "mongodb": "disconnected", "detail": str(error)},
            status=503,
        )

    return JsonResponse({"status": "ok", "mongodb": "connected"})
