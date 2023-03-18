from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('logged/', views.Logged),
    path('dologin/', views.DoLogin),
    path('dologout/', views.DoLogout)
]
