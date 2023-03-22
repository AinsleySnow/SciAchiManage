from django.urls import path

from . import views

urlpatterns = [
    path('logged/', views.Logged),
    path('dologin/', views.DoLogin),
    path('dologout/', views.DoLogout)
]
