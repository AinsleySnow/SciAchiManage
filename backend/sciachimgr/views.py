from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
import json
from . models import *
from . serializer import *


def Picture(request, picname):
    path = settings.MEDIA_ROOT + picname
    with open(path, 'rb') as pic:
        data = pic.read()
    return HttpResponse(data, content_type='image/jpeg')


def Logged(request):
    if 'logged' not in request.session:
        request.session['logged'] = False
        return HttpResponse('not logged')
    if request.session['logged'] == False:
        return HttpResponse('not logged')
    else:
        return HttpResponse('logged')


def DoLogin(request):
    received = json.loads(request.body)

    user = User.objects.filter(id=received.get('id'))
    if not user.exists():
        return HttpResponse('fail')

    user = User.objects.get(id=received.get('id'))
    if user.passwd == received.get('passwd'):
        request.session['logged'] = True
        request.session['user'] = user.id
        return HttpResponse('success')
    else:
        return HttpResponse('fail')


def DoLogout(request):
    request.session['logged'] = False
    return HttpResponse('success')



class UserView(APIView):
    serializer_class = UserSerializer

    def get(self, request):
        user = [
            {
                'id': user.name,
                'type': user.type,
                'name': user.name,
                'passwd': user.passwd,
                'sex': user.sex,
                'dept': user.dept
            } 
            for user in User.objects.all()
        ]
        return Response(user)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
