
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
 
from rest_framework import status
from api.models import *
from api.serializers import ReminderSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def setReminder(request):
    data = request.data.copy()  # Make a mutable copy of the request data
    data['user'] = request.user.id  # Associate reminder with authenticated user
    
    serializer = ReminderSerializer(data=data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def modifyReminder(request, pk):
    try:
        reminder = Reminder.objects.get(pk=pk)
    except Reminder.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ReminderSerializer(reminder, data=request.data, partial=True)  # partial=True means partial update
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def disableReminder(request, pk):
    try:
        reminder = Reminder.objects.get(pk=pk)
        reminder.is_active = False
        reminder.save()
        return Response(status=status.HTTP_200_OK)
    except Reminder.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def enableReminder(request, pk):
    try:
        reminder = Reminder.objects.get(pk=pk)
        reminder.is_active = True
        reminder.save()
        return Response(status=status.HTTP_200_OK)
    except Reminder.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteReminder(request, pk):
    try:
        reminder = Reminder.objects.get(pk=pk)
        reminder.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Reminder.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def viewReminder(request, pk=None):
    if pk:
        try:
            reminder = Reminder.objects.get(pk=pk)
            serializer = ReminderSerializer(reminder)
            return Response(serializer.data)
        except Reminder.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        reminders = Reminder.objects.filter(user=request.user)
        serializer = ReminderSerializer(reminders, many=True)
        return Response(serializer.data)
