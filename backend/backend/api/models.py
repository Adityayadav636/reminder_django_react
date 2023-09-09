from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields import BLANK_CHOICE_DASH
# Create your models here.
 

class Reminder(models.Model):
    SUBJECT_CHOICES = (
        ('English', 'English'),
        ('Mathematics', 'Mathematics'),
        ('Science', 'Science'),
    )

    RECURRENCE_CHOICES = (
        ('7Days', '7 Days'),
        ('5Days', '5 Days'),
        ('3Days', '3 Days'),
        ('2Days', '2 Days'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    date = models.DateField()
    subject = models.CharField(max_length=50, choices=SUBJECT_CHOICES)
    description = models.TextField()
    email = models.EmailField()
    contact_no = models.CharField(max_length=15)  # Assuming international phone number
    sms_no = models.CharField(max_length=15)  # Assuming international phone number
    recurrence = models.CharField(max_length=10, choices=RECURRENCE_CHOICES)

    def __str__(self):
        return f'Reminder for {self.subject} on {self.date}'
