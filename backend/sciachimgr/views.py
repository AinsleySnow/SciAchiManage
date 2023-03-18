from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from . models import *
from . serializer import *



def index(request):
    return HttpResponse("Hello world.")


def Logged(request):
    if request.session['logged'] == False:
        return HttpResponse('not logged')
    else:
        return HttpResponse('logged')


def DoLogin(request):
    user = User.objects.get(id=request.POST['id'])
    if user.passwd == request.POST['passwd']:
        request.session['logged'] = True
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
