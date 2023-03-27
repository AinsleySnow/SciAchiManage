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



class UsrInfo(APIView):
    serializer_class = UserSerializer

    def get(self, request):
        id = request.GET['id']
        ty = id[2:4]
        which = request.GET['which']

        if ty == '01' and which == 'all':
            return Response(status=403)
        elif which == 'all':
            user = [
                {
                    'id': user.id,
                    'type': user.type,
                    'name': user.name,
                    'passwd': user.passwd,
                    'sex': user.sex,
                    'dept': user.dept
                }
                for user in User.objects.all()
            ]
            return Response(user)
        else:
            user = User.objects.get(id=which)
            return Response(
                {
                    'id': user.id,
                    'type': user.type,
                    'name': user.name,
                    'passwd': user.passwd,
                    'sex': user.sex,
                    'dept': user.dept
                }
            )

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class ResearcherInfo(APIView):
    serializer_class = ResearcherSerializer

    def get(self, request):
        id = request.GET['id']
        ty = id[2:4]
        if ty != '01':
            return Response(status=400)

        researcher = Researcher.objects.get(rid=id)
        return Response(
            {
                'id': id,
                'dept': researcher.dept,
                'position': researcher.position,
                'profile': researcher.profile,
                'work': researcher.work,
                'photo': researcher.photo.name
            }
        )

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


def SetUserInfo(request):
    received = json.loads(request.body)
    id = request.GET['id']

    user = User.objects.get(id=id)
    if user.id != received.get('id'):
        user.id = received.get('id')
        user.type = received.get('id')[2:4]
    if user.name != received.get('rname'):
        user.name = received.get('rname')
    if user.name != received.get('passwd'):
        user.passwd = received.get('passwd')
    if user.name != received.get('sex'):
        user.sex = received.get('sex')
    if user.name != received.get('dept'):
        user.dept = received.get('dept')

    user.save()
    return HttpResponse('success')


def SetResearcherInfo(request):
    received = json.loads(request.body)
    id = request.GET['id']

    researcher = Researcher.objects.get(rid=id)
    if researcher.position != received.get('position'):
        researcher.position = received.get('position')
    if researcher.profile != received.get('profile'):
        researcher.profile = received.get('profile')
    if researcher.work != received.get('works'):
        researcher.work = received.get('works')

    researcher.save()
    return HttpResponse('success')


def AddUser(request):
    received = json.loads(request.body)
    curusr = received.get('uid')
    if curusr[2:4] != '03':
        return Response(status=403)

    User.objects.create(
        id = received.get('id'),
        type = received.get('id')[2:4],
        name = received.get('uname'),
        passwd = received.get('passwd'),
        sex = received.get('sex'),
        dept = received.get('dept')
    )

    if received.get('id')[2:4] == '01':
        usr = User.objects.get(id=received.get('id'))
        Researcher.objects.create(
            rid=usr,
            dept=usr.dept,
            position='',
            profile='',
            work='',
            photo=None
        )

    return HttpResponse('success')


def DeleteUser(request):
    received = json.loads(request.body)
    try:
        curusr = received.get('curusr')
        todelete = received.get('todelete')

        # prevent admin from deleting himself/herself
        if curusr == todelete:
            return Response(status=403)

        if curusr[2:4] == '01':
            Researcher.objects.filter(rid=todelete).delete()
        User.objects.filter(id=todelete).delete()
        return HttpResponse('success')
    except:
        return Response(status=403)
