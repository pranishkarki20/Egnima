"""URL configuration for config project."""
from django.contrib import admin
from django.urls import path

from .views import health
from .events_api import events

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/health/", health, name="health"),
    path("api/events/", events, name="events"),
]

