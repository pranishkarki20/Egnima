import json
import os
from bson import ObjectId
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from pymongo.errors import PyMongoError
from .mongodb import get_mongo_database


def _cors(response):
    response["Access-Control-Allow-Origin"] = os.environ.get("FRONTEND_ORIGIN", "http://localhost:8080")
    response["Access-Control-Allow-Headers"] = "Authorization, Content-Type"
    response["Access-Control-Allow-Methods"] = "GET, POST, DELETE, OPTIONS"
    return response


def _admin(request):
    token = os.environ.get("ADMIN_API_TOKEN", "")
    return bool(token) and request.headers.get("Authorization") == f"Bearer {token}"


@csrf_exempt
def events(request):
    if request.method == "OPTIONS":
        return _cors(JsonResponse({}))
    if request.method == "GET":
        try:
            items = []
            for item in get_mongo_database().events.find().sort("date", 1):
                item["id"] = str(item.pop("_id"))
                items.append(item)
            return _cors(JsonResponse({"events": items}))
        except (PyMongoError, RuntimeError):
            return _cors(JsonResponse({"error": "Event storage is unavailable."}, status=503))
    if not _admin(request):
        return _cors(JsonResponse({"error": "A valid admin token is required."}, status=401))
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            required = ("title", "date", "location", "description")
            if any(not isinstance(data.get(key), str) or not data[key].strip() for key in required):
                return _cors(JsonResponse({"error": "Title, date, location, and description are required."}, status=400))
            record = {key: str(data.get(key, "")).strip() for key in (*required, "image", "link")}
            result = get_mongo_database().events.insert_one(record)
            record["id"] = str(result.inserted_id)
            return _cors(JsonResponse({"event": record}, status=201))
        except (ValueError, PyMongoError, RuntimeError):
            return _cors(JsonResponse({"error": "The event could not be saved."}, status=400))
    if request.method == "DELETE":
        event_id = request.GET.get("id", "")
        if not ObjectId.is_valid(event_id):
            return _cors(JsonResponse({"error": "A valid event id is required."}, status=400))
        try:
            result = get_mongo_database().events.delete_one({"_id": ObjectId(event_id)})
            if not result.deleted_count:
                return _cors(JsonResponse({"error": "Event not found."}, status=404))
            return _cors(JsonResponse({}, status=200))
        except (PyMongoError, RuntimeError):
            return _cors(JsonResponse({"error": "The event could not be deleted."}, status=503))
    return _cors(JsonResponse({"error": "Method not allowed."}, status=405))
