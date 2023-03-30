from django.urls import path

from . import views

urlpatterns = [
    path('pic/<str:picname>', views.Picture),
    path('logged/', views.Logged),
    path('dologin/', views.DoLogin),
    path('dologout/', views.DoLogout),
    path('usrinfo/', views.UsrInfo.as_view()),
    path('resinfo/', views.ResearcherInfo.as_view()),
    path('setusrinfo/', views.SetUserInfo),
    path('setresinfo/', views.SetResearcherInfo),
    path('adduser/', views.AddUser),
    path('deleteuser/', views.DeleteUser),
    path('collegelist/', views.CollegeList.as_view()),
    path('collegemembers/', views.CollegeMembers.as_view()),
    path('addcollege/', views.AddCollege),
    path('deletecollege/', views.DeleteCollege),
    path('newspaperinfo/', views.NewspaperInfo.as_view()),
    path('setnewspaperinfo/', views.SetNewspaperInfo),
    path('addnewspaper/', views.AddNewspaper),
    path('deletenewspaper/', views.DeleteNewspaper),
    path('journalinfo/', views.JournalInfo.as_view()),
    path('setjournalinfo/', views.SetJournalInfo),
    path('addjournal/', views.AddJournal),
    path('deletejournal/', views.DeleteJournal),
    path('confinfo/', views.ConferenceInfo.as_view()),
    path('setconfinfo/', views.SetConferenceInfo),
    path('addconf/', views.AddConference),
    path('deleteconf/', views.DeleteConference),
]
