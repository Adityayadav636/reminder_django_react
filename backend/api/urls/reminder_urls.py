# api/urls.py

from django.urls import path
from api.views import reminder_views as views


urlpatterns = [
    path('setreminder/', views.setReminder, name='set-reminder'),
    path('<int:id>/modify/', views.modifyReminder, name='modify-reminder'),
    path('<int:id>/disable/', views.disableReminder, name='disable-reminder'),
    path('<int:id>/enable/', views.enableReminder, name='enable-reminder'),
    path('<int:id>/delete/', views.deleteReminder, name='delete-reminder'),
    path('viewreminder/', views.viewReminder, name='view-reminder'),
    
]
