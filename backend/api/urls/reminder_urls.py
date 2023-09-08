# api/urls.py

from django.urls import path
from api.views import reminder_views as views


urlpatterns = [
    path('home/', views.getHomePage, name='home-page'),
    path('setreminder/', views.setReminder, name='set-reminder'),
    path('modifyreminder/', views.modifyReminder, name='modify-reminder'),
    path('disablereminder/', views.disableReminder, name='disable-reminder'),
    path('enablereminder/', views.enableReminder, name='enable-reminder'),
    path('deletereminder/', views.deleteReminder, name='delete-reminder'),
    path('viewreminder/', views.viewReminder, name='view-reminder'),
    
]
