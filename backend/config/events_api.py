import json
import os
import secrets
import uuid
from datetime import datetime, timezone
from bson import ObjectId, Binary
from django.core import signing
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from pymongo.errors import PyMongoError
from .mongodb import get_mongo_database


def _cors(response):
    response["Access-Control-Allow-Origin"] = os.environ.get("FRONTEND_ORIGIN", "http://localhost:8080")
    response["Access-Control-Allow-Headers"] = "Authorization, Content-Type"
    response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    return response


def _admin(request):
    token = request.headers.get("Authorization", "").removeprefix("Bearer ")
    secret = os.environ.get("ADMIN_SESSION_SECRET", "")
    username = os.environ.get("ADMIN_USERNAME", "")
    if not token or not secret or not username:
        return False
    try:
        payload = signing.loads(token, key=secret, salt="enigma-admin-session", max_age=8 * 60 * 60)
        return secrets.compare_digest(str(payload.get("sub", "")), username)
    except signing.BadSignature:
        return False


@csrf_exempt
def admin_login(request):
    if request.method == "OPTIONS":
        return _cors(JsonResponse({}))
    if request.method != "POST":
        return _cors(JsonResponse({"error": "Method not allowed."}, status=405))
    username = os.environ.get("ADMIN_USERNAME", "")
    password = os.environ.get("ADMIN_PASSWORD", "")
    secret = os.environ.get("ADMIN_SESSION_SECRET", "")
    if not username or not password or not secret:
        return _cors(JsonResponse({"error": "Admin login is not configured on the server."}, status=503))
    try:
        data = json.loads(request.body)
        if not isinstance(data, dict):
            raise ValueError
    except ValueError:
        return _cors(JsonResponse({"error": "Invalid login request."}, status=400))
    provided_user = str(data.get("username", ""))
    provided_password = str(data.get("password", ""))
    valid_user = secrets.compare_digest(provided_user, username)
    valid_password = secrets.compare_digest(provided_password, password)
    if not (valid_user and valid_password):
        return _cors(JsonResponse({"error": "Incorrect username or password."}, status=401))
    token = signing.dumps({"sub": username}, key=secret, salt="enigma-admin-session")
    return _cors(JsonResponse({"token": token, "expiresIn": 8 * 60 * 60}))

@csrf_exempt
def upload_image(request):
    if request.method == "OPTIONS":
        return _cors(JsonResponse({}))
    if request.method != "POST":
        return _cors(JsonResponse({"error": "Method not allowed."}, status=405))
    if not _admin(request):
        return _cors(JsonResponse({"error": "Sign in again to upload images."}, status=401))
    image = request.FILES.get("image")
    if not image:
        return _cors(JsonResponse({"error": "Choose an image to upload."}, status=400))
    if image.size > 5 * 1024 * 1024:
        return _cors(JsonResponse({"error": "Images must be 5 MB or smaller."}, status=400))
    content = image.read()
    if content.startswith(bytes([137, 80, 78, 71, 13, 10, 26, 10])):
        content_type = "image/png"
    elif content.startswith(bytes([255, 216, 255])):
        content_type = "image/jpeg"
    elif content.startswith((b"GIF87a", b"GIF89a")):
        content_type = "image/gif"
    elif content.startswith(b"RIFF") and content[8:12] == b"WEBP":
        content_type = "image/webp"
    else:
        return _cors(JsonResponse({"error": "Upload a valid PNG, JPEG, GIF, or WebP image."}, status=400))
    try:
        result = get_mongo_database().event_images.insert_one({
            "filename": uuid.uuid4().hex,
            "content_type": content_type,
            "data": Binary(content),
            "created_at": datetime.now(timezone.utc),
        })
        return _cors(JsonResponse({"url": f"/api/uploads/{result.inserted_id}/"}, status=201))
    except (PyMongoError, RuntimeError):
        return _cors(JsonResponse({"error": "Image storage is unavailable."}, status=503))


def uploaded_image(request, image_id):
    if request.method != "GET":
        return _cors(JsonResponse({"error": "Method not allowed."}, status=405))
    if not ObjectId.is_valid(image_id):
        return _cors(JsonResponse({"error": "Image not found."}, status=404))
    try:
        image = get_mongo_database().event_images.find_one({"_id": ObjectId(image_id)})
        if not image:
            return _cors(JsonResponse({"error": "Image not found."}, status=404))
        response = HttpResponse(bytes(image["data"]), content_type=image["content_type"])
        response["Cache-Control"] = "public, max-age=31536000, immutable"
        response["X-Content-Type-Options"] = "nosniff"
        return _cors(response)
    except (PyMongoError, RuntimeError):
        return _cors(JsonResponse({"error": "Image storage is unavailable."}, status=503))

@csrf_exempt
def team_roster(request):
    if request.method == "OPTIONS":
        return _cors(JsonResponse({}))
    if request.method == "GET":
        try:
            document = get_mongo_database().site_content.find_one({"_id": "team-roster"})
            return _cors(JsonResponse({"members": document.get("members", []) if document else []}))
        except (PyMongoError, RuntimeError):
            return _cors(JsonResponse({"error": "Team roster storage is unavailable."}, status=503))
    if request.method != "PUT":
        return _cors(JsonResponse({"error": "Method not allowed."}, status=405))
    if not _admin(request):
        return _cors(JsonResponse({"error": "Sign in again to manage the team roster."}, status=401))
    try:
        data = json.loads(request.body)
        members = data.get("members") if isinstance(data, dict) else None
        if not isinstance(members, list):
            return _cors(JsonResponse({"error": "A members list is required."}, status=400))
        normalized = []
        for member in members:
            if not isinstance(member, dict) or not str(member.get("name", "")).strip() or not str(member.get("role", "")).strip():
                return _cors(JsonResponse({"error": "Every team member needs a name and role."}, status=400))
            normalized.append({
                "id": str(member.get("id") or uuid.uuid4().hex),
                "name": str(member.get("name", "")).strip(),
                "role": str(member.get("role", "")).strip(),
                "department": str(member.get("department", "")).strip(),
                "description": str(member.get("description", "")).strip(),
                "image": str(member.get("image", "")).strip(),
                "email": str(member.get("email", "")).strip(),
                "linkedin": str(member.get("linkedin", "")).strip(),
                "github": str(member.get("github", "")).strip(),
            })
        get_mongo_database().site_content.replace_one(
            {"_id": "team-roster"}, {"members": normalized}, upsert=True
        )
        return _cors(JsonResponse({"members": normalized}))
    except (ValueError, PyMongoError, RuntimeError):
        return _cors(JsonResponse({"error": "The team roster could not be saved."}, status=503))

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
        return _cors(JsonResponse({"error": "Sign in again to manage events."}, status=401))
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            required = ("title", "date", "location", "description")
            if any(not isinstance(data.get(key), str) or not data[key].strip() for key in required):
                return _cors(JsonResponse({"error": "Title, date, location, and description are required."}, status=400))
            record = {key: str(data.get(key, "")).strip() for key in (*required, "image", "link")}
            result = get_mongo_database().events.insert_one(record)
            record.pop("_id", None)
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




