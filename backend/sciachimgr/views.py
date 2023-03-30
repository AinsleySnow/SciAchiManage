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


class CollegeList(APIView):
    serializer_class = CollegeSerializer

    def get(self, request):
        college = [
            {
                'id': c.id,
                'name': c.name
            }
            for c in College.objects.all()
        ]
        return Response(college)

    def post(self, request):
        serializer = CollegeSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class CollegeMembers(APIView):
    serializer_class = UserSerializer

    def get(self, request):
        name = College.objects.get(id=request.GET['id']).name
        user = [
            {
                'id': user.id,
                'type': user.type,
                'name': user.name,
                'passwd': user.passwd,
                'sex': user.sex,
                'dept': user.dept
            }
            for user in User.objects.filter(dept=name)
        ]
        return Response(user)
   
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


def AddCollege(request):
    received = json.loads(request.body)
    curusr = received.get('curusr')
    toadd = received.get('toadd')

    if curusr[2:4] != '03':
        return Response(status=403)

    College.objects.create(name=toadd)
    return HttpResponse('success')


def DeleteCollege(request):
    received = json.loads(request.body)
    curusr = received.get('curusr')
    todelete = received.get('todelete')

    if curusr[2:4] != '03':
        return Response(status=403)

    College.objects.filter(id=todelete).delete()
    id = '%02d' % int(todelete)
    Researcher.objects.filter(rid__id__startswith=id).delete()
    User.objects.filter(id__startswith=id).delete()

    return HttpResponse('success')


class NewspaperInfo(APIView):
    serializer_class = UserSerializer

    def get(self, request):
        issn = request.GET['issn']
        if issn != 'all':
            np = Newspaper.objects.get(issn=issn)
            return Response({
                'issn': np.issn,
                'title': np.title,
                'authority': np.authority,
                'host': np.host,
                'city': np.city,
                'address': np.address,
                'postcode': np.postcode,
                'phone_num': np.phone_num,
                'picture': np.picture.name,
                'link': np.link
            })
        else:
            newspaper = [
                {
                    'issn': np.issn,
                    'title': np.title,
                    'authority': np.authority,
                    'host': np.host,
                    'city': np.city,
                    'address': np.address,
                    'postcode': np.postcode,
                    'phone_num': np.phone_num,
                    'picture': np.picture.name,
                    'link': np.link
                }
                for np in Newspaper.objects.all()
            ]
            return Response(newspaper)

    def post(self, request):
        serializer = NewspaperSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


def SetNewspaperInfo(request):
    received = json.loads(request.body)
    issn = received.get('issn')

    np = Newspaper.objects.get(issn=issn)
    if np.issn != received.get('issn'):
        np.issn = received.get('issn')
    if np.title != received.get('title'):
        np.title = received.get('title')
    if np.authority != received.get('authority'):
        np.authority = received.get('authority')
    if np.host != received.get('host'):
        np.host = received.get('host')
    if np.city != received.get('city'):
        np.city = received.get('city')
    if np.address != received.get('address'):
        np.address = received.get('address')
    if np.postcode != received.get('postcode'):
        np.postcode = received.get('postcode')
    if np.phone_num != received.get('phone_num'):
        np.phone_num = received.get('phone_num')
    if np.picture.name != received.get('picture'):
        np.picture = received.get('picture')

    np.save()
    return HttpResponse('success')


def AddNewspaper(request):
    received = json.loads(request.body)
    curusr = received.get('uid')
    if curusr[2:4] != '03':
        return Response(status=403)

    Newspaper.objects.create(
        issn = received.get('issn'),
        title = received.get('title'),
        authority = received.get('authority'),
        host = received.get('host'),
        city = received.get('city'),
        address = received.get('address'),
        postcode = received.get('postcode'),
        phone_num = received.get('phone_num'),
        picture = received.get('picture'),
        link = received.get('link')
    )

    return HttpResponse('success')


def DeleteNewspaper(request):
    received = json.loads(request.body)
    try:
        curusr = received.get('curusr')
        if curusr[2:4] != '03':
            return Response(status=403)

        todelete = received.get('todelete')
        Newspaper.objects.filter(issn=todelete).delete()
        return HttpResponse('success')
    except:
        return Response(status=403)


class JournalInfo(APIView):
    serializer_class = JournalSerializer

    def get(self, request):
        issn = request.GET['issn']
        if issn != 'all':
            journal = Journal.objects.get(issn=issn)
            return Response({
                'issn': journal.issn,
                'title': journal.title,
                'host': journal.host,
                'period': journal.period,
                'inf_factor': journal.inf_factor,
                'zone': journal.zone,
                'picture': journal.picture.name,
                'link': journal.link
            })
        else:
            journal = [
                {
                    'issn': j.issn,
                    'title': j.title,
                    'host': j.host,
                    'period': j.period,
                    'inf_factor': j.inf_factor,
                    'zone': j.zone,
                    'picture': j.picture.name,
                    'link': j.link
                }
                for j in Journal.objects.all()
            ]
            return Response(journal)

    def post(self, request):
        serializer = JournalSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


def SetJournalInfo(request):
    received = json.loads(request.body)
    issn = received.get('issn')

    j = Journal.objects.get(issn=issn)
    if j.issn != received.get('issn'):
        j.issn = received.get('issn')
    if j.title != received.get('title'):
        j.title = received.get('title')
    if j.host != received.get('host'):
        j.host = received.get('host')
    if j.period != received.get('period'):
        j.period = received.get('period')
    if j.inf_factor != received.get('inf_factor'):
        j.inf_factor = received.get('inf_factor')
    if j.zone != received.get('zone'):
        j.zone = received.get('zone')
    if j.picture.name != received.get('picture'):
        j.picture = received.get('picture')
    if j.link != received.get('link'):
        j.link = received.get('link')

    j.save()
    return HttpResponse('success')


def AddJournal(request):
    received = json.loads(request.body)
    curusr = received.get('uid')
    if curusr[2:4] != '03':
        return Response(status=403)

    Journal.objects.create(
        issn = received.get('issn'),
        title = received.get('title'),
        host = received.get('host'),
        period = received.get('period'),
        inf_factor = received.get('inf_factor'),
        zone = received.get('zone'),
        picture = received.get('picture'),
        link = received.get('link')
    )

    return HttpResponse('success')


def DeleteJournal(request):
    received = json.loads(request.body)
    try:
        curusr = received.get('curusr')
        if curusr[2:4] != '03':
            return Response(status=403)

        todelete = received.get('todelete')
        Journal.objects.filter(issn=todelete).delete()
        return HttpResponse('success')
    except:
        return Response(status=403)


class ConferenceInfo(APIView):
    serializer_class = UserSerializer

    def get(self, request):
        id = request.GET['id']
        if id != 'all':
            conf = Conference.objects.get(id=id)
            return Response({
                'id': conf.id,
                'name': conf.name,
                'time': conf.time,
                'place': conf.place,
                'association': conf.association,
                'publisher': conf.publisher,
                'publish_date': conf.publish_date,
                'chief_editor': conf.chief_editor,
                'editors': conf.editors,
                'link': conf.link
            })
        else:
            conference = [
                {
                    'id': conf.id,
                    'name': conf.name,
                    'time': conf.time,
                    'place': conf.place,
                    'association': conf.association,
                    'publisher': conf.publisher,
                    'publish_date': conf.publish_date,
                    'chief_editor': conf.chief_editor,
                    'editors': conf.editors,
                    'link': conf.link
                }
                for conf in Conference.objects.all()
            ]
            return Response(conference)

    def post(self, request):
        serializer = NewspaperSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


def SetConferenceInfo(request):
    received = json.loads(request.body)
    id = received.get('id')

    conf = Conference.objects.get(id=id)
    if conf.id != received.get('id'):
        conf.id = received.get('id')
    if conf.title != received.get('title'):
        conf.title = received.get('title')
    if conf.authority != received.get('authority'):
        conf.authority = received.get('authority')
    if conf.host != received.get('host'):
        conf.host = received.get('host')
    if conf.city != received.get('city'):
        conf.city = received.get('city')
    if conf.address != received.get('address'):
        conf.address = received.get('address')
    if conf.postcode != received.get('postcode'):
        conf.postcode = received.get('postcode')
    if conf.phone_num != received.get('phone_num'):
        conf.phone_num = received.get('phone_num')
    if conf.picture.name != received.get('picture'):
        conf.picture = received.get('picture')

    conf.save()
    return HttpResponse('success')


def AddConference(request):
    received = json.loads(request.body)
    curusr = received.get('uid')
    if curusr[2:4] != '03':
        return Response(status=403)

    Conference.objects.create(
        name = received.get('name'),
        time = received.get('time'),
        place = received.get('place'),
        association = received.get('association'),
        publisher = received.get('publisher'),
        publish_date = received.get('publish_date'),
        chief_editor = received.get('chief_editor'),
        editors = received.get('editors'),
        link = received.get('link')
    )

    return HttpResponse('success')


def DeleteConference(request):
    received = json.loads(request.body)
    try:
        curusr = received.get('curusr')
        if curusr[2:4] != '03':
            return Response(status=403)

        todelete = received.get('todelete')
        Conference.objects.filter(issn=todelete).delete()
        return HttpResponse('success')
    except:
        return Response(status=403)
