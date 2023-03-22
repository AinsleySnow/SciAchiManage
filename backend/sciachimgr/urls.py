from django.urls import path

from . import views

urlpatterns = [
    path('pic/<str:picname>', views.Picture),
    path('logged/', views.Logged),
    path('dologin/', views.DoLogin),
    path('dologout/', views.DoLogout)
]
