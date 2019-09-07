from django.contrib import admin
from django.urls import path, include
from . import views
from django.conf.urls.static import static
from django.conf import settings
from django.contrib.auth.views import PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, PasswordResetCompleteView

urlpatterns = [

    path('welcome/', views.welcome, name = 'welcome'),

] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
