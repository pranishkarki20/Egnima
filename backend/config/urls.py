"""URL configuration for config project."""
from django.contrib import admin
from django.urls import path

from .views import health
from .events_api import admin_login, events, upload_image, uploaded_image, team_roster

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/health/", health, name="health"),
    path("api/events/", events, name="events"),
    path("api/team/", team_roster, name="team-roster"),
    path("api/admin/login/", admin_login, name="admin-login"),
    path("api/admin/uploads/", upload_image, name="admin-upload-image"),
    path("api/uploads/<str:image_id>/", uploaded_image, name="uploaded-image"),
]




