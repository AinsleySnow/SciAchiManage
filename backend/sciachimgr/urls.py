from django.urls import path

from . import views

urlpatterns = [
    path('pic/<str:picname>', views.Picture),
    path('logged/', views.Logged),
    path('dologin/', views.DoLogin),
    path('dologout/', views.DoLogout),
    path('usrinfo/', views.UsrInfo.as_view()),
    path('resinfo/', views.ResearcherInfo.as_view())
]
