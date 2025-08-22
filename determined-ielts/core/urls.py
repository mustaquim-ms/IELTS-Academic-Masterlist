from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('aitools/', views.blogs, name="aitools"),
    path('blogs/', views.blogs, name="blogs"),
    path('videos/', views.videos, name="videos"),
    path('resources/', views.resources, name="resources"),
    path('ielts-module/', views.ielts_module, name="ielts_module"),
    path('contact/', views.contact, name="contact"),
    path('auth/', views.auth_page, name="auth"),
]
