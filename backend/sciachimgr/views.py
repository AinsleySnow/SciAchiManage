from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
from django.db.models.functions import Substr
from rest_framework.views import APIView
from rest_framework.response import Response
import json
from . models import *
from . serializer import *


def Picture(request, picname):
    print(picname)
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

    print(received.get('id'))
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

    np.save()
    return HttpResponse('success')


def AddNewspaper(request):
    received = json.loads(request.body)
    curusr = received.get('curusr')
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
    if j.link != received.get('link'):
        j.link = received.get('link')

    j.save()
    return HttpResponse('success')


def AddJournal(request):
    received = json.loads(request.body)
    curusr = received.get('curusr')
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
        serializer = ConferenceSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


def SetConferenceInfo(request):
    received = json.loads(request.body)
    id = received.get('id')

    conf = Conference.objects.get(id=id)
    if conf.id != received.get('id'):
        conf.id = received.get('id')
    if conf.name != received.get('name'):
        conf.name = received.get('name')
    if conf.time != received.get('time'):
        conf.time = received.get('time')
    if conf.place != received.get('place'):
        conf.place = received.get('place')
    if conf.association != received.get('association'):
        conf.association = received.get('association')
    if conf.publisher != received.get('publisher'):
        conf.publisher = received.get('publisher')
    if conf.publish_date != received.get('publish_date'):
        conf.publish_date = received.get('publish_date')
    if conf.chief_editor != received.get('chief_editor'):
        conf.chief_editor = received.get('chief_editor')
    if conf.editors != received.get('editors'):
        conf.editors = received.get('editors')
    if conf.link != received.get('link'):
        conf.link = received.get('link')

    conf.save()
    return HttpResponse('success')


def AddConference(request):
    received = json.loads(request.body)
    curusr = received.get('curusr')
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


class PaperInfo(APIView):
    serializer_class = PaperSerializer

    batch_size = 250
    total_objects = Paper.objects.count()

    def get(self, request):
        id = request.GET['id']
        if id != 'all':
            p = Paper.objects.get(id=id)
            return Response({
                'id': p.id,
                'issn': p.issn.issn,
                'title': p.title,
                'author': p.author,
                'page': p.page,
                'volume': p.volume,
                'number': p.number,
                'publish_date': p.publish_date,
                'link': p.link
            })
        else:
            start = int(request.GET['from'])
            if start >= PaperInfo.total_objects:
                return None
            paper = [
                {
                    'id': p.id,
                    'issn': p.issn.issn,
                    'title': p.title,
                    'author': p.author,
                    'page': p.page,
                    'volume': p.volume,
                    'number': p.number,
                    'publish_date': p.publish_date,
                    'link': p.link
                }
                for p in Paper.objects.all()[start:start + PaperInfo.batch_size]
            ]
            return Response(paper)

    def post(self, request):
        serializer = PaperSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


def SetPaperInfo(request):
    received = json.loads(request.body)
    id = received.get('id')

    p = Paper.objects.get(id=id)
    if p.id != received.get('id'):
        p.id = received.get('id')
    if p.issn != received.get('issn'):
        p.issn = Journal.objects.get(issn=received.get('issn'))
    if p.title != received.get('title'):
        p.title = received.get('title')
    if p.author != received.get('author'):
        p.author = received.get('author')
    if p.page != received.get('page'):
        p.page = received.get('page')
    if p.volume != received.get('volume'):
        p.volume = received.get('volume')
    if p.number != received.get('number'):
        p.number = received.get('number')
    if p.publish_date != received.get('publish_date'):
        p.publish_date = received.get('publish_date')
    if p.link != received.get('link'):
        p.link = received.get('link')

    p.save()
    return HttpResponse('success')


def AddPaper(request):
    received = json.loads(request.body)
    curusr = received.get('curusr')
    if curusr[2:4] != '03':
        return Response(status=403)

    Paper.objects.create(
        issn = Journal.objects.get(issn=received.get('issn')),
        title = received.get('title'),
        author = received.get('author'),
        page = received.get('page'),
        volume = received.get('volume'),
        number = received.get('number'),
        publish_date = received.get('publish_date'),
        link = received.get('link')
    )

    return HttpResponse('success')


def DeletePaper(request):
    received = json.loads(request.body)
    try:
        curusr = received.get('curusr')
        if curusr[2:4] != '03':
            return Response(status=403)

        todelete = received.get('todelete')
        Paper.objects.filter(id=todelete).delete()
        return HttpResponse('success')
    except:
        return Response(status=403)


class ConfpaperInfo(APIView):
    serializer_class = ConfpaperSerializer

    batch_size = 250
    total_objects = ConferencePaper.objects.count()

    def get(self, request):
        id = request.GET['id']
        if id != 'all':
            cp = ConferencePaper.objects.get(id=id)
            return Response({
                'id': cp.id,
                'cid': cp.cid.id,
                'title': cp.title,
                'author': cp.author,
                'page': cp.page,
                'publish_date': cp.publish_date,
                'link': cp.link
            })
        else:
            start = int(request.GET['from'])
            if start >= ConfpaperInfo.total_objects:
                return None
            confpaper = [
                {
                    'id': cp.id,
                    'cid': cp.cid.id,
                    'title': cp.title,
                    'author': cp.author,
                    'page': cp.page,
                    'publish_date': cp.publish_date,
                    'link': cp.link
                }
                for cp in ConferencePaper.objects.all()[start:start + ConfpaperInfo.batch_size]
            ]
            return Response(confpaper)

    def post(self, request):
        serializer = ConfpaperSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


def SetConfpaperInfo(request):
    received = json.loads(request.body)
    id = received.get('id')

    cp = ConferencePaper.objects.get(id=id)
    if cp.id != received.get('id'):
        cp.id = received.get('id')
    if cp.cid != received.get('cid'):
        cp.cid = Conference.objects.get(id=received.get('cid'))
    if cp.title != received.get('title'):
        cp.title = received.get('title')
    if cp.author != received.get('author'):
        cp.author = received.get('author')
    if cp.page != received.get('page'):
        cp.page = received.get('page')
    if cp.publish_date != received.get('publish_date'):
        cp.publish_date = received.get('publish_date')
    if cp.link != received.get('link'):
        cp.link = received.get('link')

    cp.save()
    return HttpResponse('success')


def AddConfpaper(request):
    received = json.loads(request.body)
    curusr = received.get('curusr')
    if curusr[2:4] != '03':
        return Response(status=403)

    ConferencePaper.objects.create(
        cid = Conference.objects.get(id=received.get('cid')),
        title = received.get('title'),
        author = received.get('author'),
        page = received.get('page'),
        publish_date = received.get('publish_date'),
        link = received.get('link')
    )

    return HttpResponse('success')


def DeleteConfpaper(request):
    received = json.loads(request.body)
    try:
        curusr = received.get('curusr')
        if curusr[2:4] != '03':
            return Response(status=403)

        todelete = received.get('todelete')
        ConferencePaper.objects.filter(id=todelete).delete()
        return HttpResponse('success')
    except:
        return Response(status=403)


class ArticleInfo(APIView):
    serializer_class = ArticleSerializer

    batch_size = 250
    total_objects = Article.objects.count()

    def get(self, request):
        id = request.GET['id']
        if id != 'all':
            a = Article.objects.get(id=id)
            return Response({
                'id': a.id,
                'issn': a.issn.issn,
                'title': a.title,
                'author': a.author,
                'version': a.version,
                'publish_date': a.publish_date,
                'link': a.link
            })
        else:
            start = int(request.GET['from'])
            if start >= ArticleInfo.total_objects:
                return None
            article = [
                {
                    'id': a.id,
                    'issn': a.issn.issn,
                    'title': a.title,
                    'author': a.author,
                    'version': a.version,
                    'publish_date': a.publish_date,
                    'link': a.link
                }
                for a in Article.objects.all()[start:start + ArticleInfo.batch_size]
            ]
            return Response(article)

    def post(self, request):
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


def SetArticleInfo(request):
    received = json.loads(request.body)
    id = received.get('id')

    a = Article.objects.get(id=id)
    if a.id != received.get('id'):
        a.id = received.get('id')
    if a.issn != received.get('issn'):
        a.issn = Newspaper.objects.get(issn=received.get('issn'))
    if a.title != received.get('title'):
        a.title = received.get('title')
    if a.author != received.get('author'):
        a.author = received.get('author')
    if a.version != received.get('version'):
        a.version = received.get('version')
    if a.publish_date != received.get('publish_date'):
        a.publish_date = received.get('publish_date')
    if a.link != received.get('link'):
        a.link = received.get('link')

    a.save()
    return HttpResponse('success')


def AddArticle(request):
    received = json.loads(request.body)
    curusr = received.get('curusr')
    if curusr[2:4] != '03':
        return Response(status=403)

    Article.objects.create(
        issn = Newspaper.objects.get(issn=received.get('issn')),
        title = received.get('title'),
        author = received.get('author'),
        version = received.get('version'),
        publish_date = received.get('publish_date'),
        link = received.get('link')
    )

    return HttpResponse('success')


def DeleteArticle(request):
    received = json.loads(request.body)
    try:
        curusr = received.get('curusr')
        if curusr[2:4] != '03':
            return Response(status=403)

        todelete = received.get('todelete')
        Article.objects.filter(id=todelete).delete()
        return HttpResponse('success')
    except:
        return Response(status=403)


class BookInfo(APIView):
    serializer_class = BookSerializer

    batch_size = 250
    total_objects = Book.objects.count()

    def get(self, request):
        isbn = request.GET['isbn']
        if isbn != 'all':
            b = Book.objects.get(isbn=isbn)
            return Response({
                'isbn': b.isbn,
                'title': b.title,
                'author': b.author,
                'publisher': b.publisher,
                'publish_year': b.publish_year,
                'place_published': b.place_published,
                'picture': '',
                'link': b.link
            })
        else:
            start = int(request.GET['from'])
            if start >= BookInfo.total_objects:
                return None
            book = [
                {
                    'isbn': b.isbn,
                    'title': b.title,
                    'author': b.author,
                    'publisher': b.publisher,
                    'publish_year': b.publish_year,
                    'place_published': b.place_published,
                    'picture': '',
                    'link': b.link
                }
                for b in Book.objects.all()[start:start + BookInfo.batch_size]
            ]
            return Response(book)

    def post(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


def SetBookInfo(request):
    received = json.loads(request.body)
    isbn = received.get('isbn')

    b = Book.objects.get(isbn=isbn)
    if b.isbn != received.get('isbn'):
        b.isbn = received.get('isbn')
    if b.title != received.get('title'):
        b.title = received.get('title')
    if b.author != received.get('author'):
        b.author = received.get('author')
    if b.publisher != received.get('publisher'):
        b.publisher = received.get('publisher')
    if b.publish_year != received.get('publish_year'):
        b.publish_year = received.get('publish_year')
    # if b.picture != received.get('picture'):
        # b.picture = received.get('picture')
    if b.link != received.get('link'):
        b.link = received.get('link')

    b.save()
    return HttpResponse('success')


def AddBook(request):
    received = json.loads(request.body)
    curusr = received.get('curusr')
    if curusr[2:4] != '03':
        return Response(status=403)

    Book.objects.create(
        isbn = received.get('isbn'),
        title = received.get('title'),
        author = received.get('author'),
        publisher = received.get('publisher'),
        publish_year = received.get('publish_year'),
        place_published = received.get('place_published'),
        picture = received.get('picture'),
        link = received.get('link')
    )

    return HttpResponse('success')


def DeleteBook(request):
    received = json.loads(request.body)
    try:
        curusr = received.get('curusr')
        if curusr[2:4] != '03':
            return Response(status=403)

        todelete = received.get('todelete')
        Book.objects.filter(id=todelete).delete()
        return HttpResponse('success')
    except:
        return Response(status=403)


class PrizeInfo(APIView):
    serializer_class = PrizeSerializer

    batch_size = 250
    total_objects = Prize.objects.count()

    def get(self, request):
        id = request.GET['id']
        if id != 'all':
            p = Prize.objects.get(id=id)
            return Response({
                'id': p.id,
                'name': p.prize_name,
                'desp': p.desp,
                'apply_date': p.apply_date
            })
        else:
            start = int(request.GET['from'])
            if start >= PrizeInfo.total_objects:
                return None
            prize = [
                {
                    'id': p.id,
                    'name': p.prize_name,
                    'desp': p.desp,
                    'apply_date': p.apply_date
                }
                for p in Prize.objects.all()[start:start + PrizeInfo.batch_size]
            ]
            return Response(prize)

    def post(self, request):
        serializer = PrizeSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


def SetPrizeInfo(request):
    received = json.loads(request.body)
    id = received.get('id')

    p = Prize.objects.get(id=id)
    if p.id != received.get('id'):
        p.id = received.get('id')
    if p.prize_name != received.get('name'):
        p.prize_name = received.get('name')
    if p.desp != received.get('desp'):
        p.desp = received.get('desp')
    if p.apply_date != received.get('apply_date'):
        p.apply_date = received.get('apply_date')

    p.save()
    return HttpResponse('success')


def AddPrize(request):
    received = json.loads(request.body)
    curusr = received.get('curusr')
    if curusr[2:4] != '03':
        return Response(status=403)

    Prize.objects.create(
        prize_name = received.get('name'),
        desp = received.get('desp'),
        apply_date = received.get('apply_date'),
    )

    return HttpResponse('success')


def DeletePrize(request):
    received = json.loads(request.body)
    try:
        curusr = received.get('curusr')
        if curusr[2:4] != '03':
            return Response(status=403)

        todelete = received.get('todelete')
        Prize.objects.filter(id=todelete).delete()
        return HttpResponse('success')
    except:
        return Response(status=403)


class PatentInfo(APIView):
    serializer_class = PatentSerializer

    batch_size = 250
    total_objects = Patent.objects.count()

    def get(self, request):
        patent_num = request.GET['patent_num']
        if patent_num != 'all':
            p = Patent.objects.get(patent_num=patent_num)
            return Response({
                'patent_num': p.patent_num,
                'promulgate_num': p.promulgate_num,
                'name': p.name,
                'applyer': p.applyer,
                'inventor': p.inventor,
                'issue': p.issue,
                'theme': p.theme,
                'catagory_num': p.catagory_num,
                'major_catagory': p.major_catagory,
                'link': p.link
            })
        else:
            start = int(request.GET['from'])
            if start >= PatentInfo.total_objects:
                return None
            patent = [
                {
                    'patent_num': p.patent_num,
                    'promulgate_num': p.promulgate_num,
                    'name': p.name,
                    'applyer': p.applyer,
                    'inventor': p.inventor,
                    'issue': p.issue,
                    'theme': p.theme,
                    'catagory_num': p.catagory_num,
                    'major_catagory': p.major_catagory,
                    'link': p.link
                }
                for p in Patent.objects.all()[start:start + PatentInfo.batch_size]
            ]
            return Response(patent)

    def post(self, request):
        serializer = PatentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


def SetPatentInfo(request):
    received = json.loads(request.body)
    patent_num = received.get('patent_num')

    p = Patent.objects.get(patent_num=patent_num)
    if p.patent_num != received.get('patent_num'):
        p.patent_num = received.get('patent_num')
    if p.promulgate_num != received.get('promulgate_num'):
        p.promulgate_num = received.get('promulgate_num')
    if p.name != received.get('name'):
        p.name = received.get('name')
    if p.applyer != received.get('applyer'):
        p.applyer = received.get('applyer')
    if p.inventor != received.get('inventor'):
        p.inventor = received.get('inventor')
    if p.issue != received.get('issue'):
        p.issue = received.get('issue')
    if p.theme != received.get('theme'):
        p.theme = received.get('theme')
    if p.catagory_num != received.get('catagory_num'):
        p.catagory_num = received.get('catagory_num')
    if p.major_catagory != received.get('major_catagory'):
        p.major_catagory = received.get('major_catagory')
    if p.link != received.get('link'):
        p.link = received.get('link')

    p.save()
    return HttpResponse('success')


def AddPatent(request):
    received = json.loads(request.body)
    curusr = received.get('curusr')
    if curusr[2:4] != '03':
        return Response(status=403)

    Patent.objects.create(
        patent_num = received.get('patent_num'),
        promulgate_num = received.get('promulgate_num'),
        name = received.get('name'),
        applyer = received.get('applyer'),
        inventor = received.get('inventor'),
        issue = received.get('issue'),
        theme = received.get('theme'),
        catagory_num = received.get('catagory_num'),
        major_catagory = received.get('major_catagory'),
        link = received.get('link')
    )

    return HttpResponse('success')


def DeletePatent(request):
    received = json.loads(request.body)
    try:
        curusr = received.get('curusr')
        if curusr[2:4] != '03':
            return Response(status=403)

        todelete = received.get('todelete')
        Patent.objects.filter(patent_num=todelete).delete()
        return HttpResponse('success')
    except:
        return Response(status=403)


class Apply(APIView):
    def get(self, request):
        utype = request.GET['uid'][2:4]
        type = request.GET['type']
        id = request.GET['id']
        _from = int(request.GET['from'])
        to = int(request.GET['to'])

        if utype == '02' and id == 'all':
            if type == 'paper':
                apply = PaperAuthor.objects.filter(Substr('id', 2, 2) == utype)[_from:to]
                serializer = PaperAuthorSerializer(apply, many=True)
                return Response(serializer.data)
            elif type == 'article':
                apply = NewspaperAuthor.objects.filter(Substr('id', 2, 2) == utype)[_from:to]
                serializer = NewspaperAuthorSerializer(apply, many=True)
                return Response(serializer.data)
            elif type == 'confpaper':
                apply = ConferenceAuthor.objects.filter(Substr('id', 2, 2) == utype)[_from:to]
                serializer = ConferenceAuthorSerializer(apply, many=True)
                return Response(serializer.data)
            elif type == 'book':
                apply = BookAuthor.objects.filter(Substr('id', 2, 2) == utype)[_from:to]
                serializer = BookAuthorSerializer(apply, many=True)
                return Response(serializer.data)
            elif type == 'patent':
                apply = PatentAuthor.objects.filter(Substr('id', 2, 2) == utype)[_from:to]
                serializer = PatentAuthorSerializer(apply, many=True)
                return Response(serializer.data)
            elif type == 'prize':
                apply = PrizeAuthor.objects.filter(Substr('id', 2, 2) == utype)[_from:to]
                serializer = PrizeAuthorSerializer(apply, many=True)
                return Response(serializer.data)

        if id == 'all':
            if type == 'paper':
                apply = PaperAuthor.objects.all()[_from:to]
                serializer = PaperAuthorSerializer(apply, many=True)
                return Response(serializer.data)
            elif type == 'article':
                apply = NewspaperAuthor.objects.all()[_from:to]
                serializer = NewspaperAuthorSerializer(apply, many=True)
                return Response(serializer.data)
            elif type == 'confpaper':
                apply = ConferenceAuthor.objects.all()[_from:to]
                serializer = ConferenceAuthorSerializer(apply, many=True)
                return Response(serializer.data)
            elif type == 'book':
                apply = BookAuthor.objects.all()[_from:to]
                serializer = BookAuthorSerializer(apply, many=True)
                return Response(serializer.data)
            elif type == 'patent':
                apply = PatentAuthor.objects.all()[_from:to]
                serializer = PatentAuthorSerializer(apply, many=True)
                return Response(serializer.data)
            elif type == 'prize':
                apply = PrizeAuthor.objects.all()[_from:to]
                serializer = PrizeAuthorSerializer(apply, many=True)
                return Response(serializer.data)


        if type == 'paper':
            apply = PaperAuthor.objects.filter(applicant__id=id)
            serializer = PaperAuthorSerializer(apply, many=True)
            return Response(serializer.data)
        elif type == 'article':
            apply = NewspaperAuthor.objects.filter(applicant__id=id)
            serializer = NewspaperAuthorSerializer(apply, many=True)
            return Response(serializer.data)
        elif type == 'confpaper':
            apply = ConferenceAuthor.objects.filter(applicant__id=id)
            serializer = ConferenceAuthorSerializer(apply, many=True)
            return Response(serializer.data)
        elif type == 'book':
            apply = BookAuthor.objects.filter(applicant__id=id)
            serializer = BookAuthorSerializer(apply, many=True)
            return Response(serializer.data)
        elif type == 'patent':
            apply = PatentAuthor.objects.filter(applicant__id=id)
            serializer = PatentAuthorSerializer(apply, many=True)
            return Response(serializer.data)
        elif type == 'prize':
            apply = PrizeAuthor.objects.filter(applicant__id=id)
            serializer = PrizeAuthorSerializer(apply, many=True)
            return Response(serializer.data)

        return None

    def post(self, request):
        return self.get(request)


def AddApply(request):
    received = json.loads(request.body)
    curusr = received.get('curusr')
    type = received.get('type')

    if curusr[2:4] != '01':
        return Response(status=403)

    if type == 'paper':
        p = Paper.objects.create(
            issn = Journal.objects.get(issn=received.get('issn')),
            title = received.get('title'),
            author = received.get('author'),
            page = received.get('page'),
            volume = received.get('volume'),
            number = received.get('number'),
            publish_date = received.get('publish_date'),
            link = received.get('link')
        )

        PaperAuthor.objects.create(
            applicant = User.objects.get(id=curusr),
            pid = p,
            status = 3
        )
    elif type == 'article':
        a = Article.objects.create(
            issn = Newspaper.objects.get(issn=received.get('issn')),
            title = received.get('title'),
            author = received.get('author'),
            version = received.get('version'),
            publish_date = received.get('publish_date'),
            link = received.get('link')
        )

        NewspaperAuthor.objects.create(
            applicant = User.objects.get(id=curusr),
            nid = a,
            status = 3
        )
    elif type == 'confpaper':
        cp = ConferencePaper.objects.create(
            cid = Conference.objects.get(id=received.get('cid')),
            title = received.get('title'),
            author = received.get('author'),
            page = received.get('page'),
            publish_date = received.get('publish_date'),
            link = received.get('link')
        )

        ConferenceAuthor.objects.create(
            applicant = User.objects.get(id=curusr),
            cid = cp,
            status = 3
        )
    elif type == 'book':
        b = Book.objects.create(
            isbn = received.get('isbn'),
            title = received.get('title'),
            author = received.get('author'),
            publisher = received.get('publisher'),
            publish_year = received.get('publish_year'),
            place_published = received.get('place_published'),
            picture = received.get('picture'),
            link = received.get('link')
        )

        BookAuthor.objects.create(
            applicant = User.objects.get(id=curusr),
            bid = b,
            status = 3
        )
    elif type == 'patent':
        pa = Patent.objects.create(
            patent_num = received.get('patent_num'),
            promulgate_num = received.get('promulgate_num'),
            name = received.get('name'),
            applyer = received.get('applyer'),
            inventor = received.get('inventor'),
            issue = received.get('issue'),
            theme = received.get('theme'),
            catagory_num = received.get('catagory_num'),
            major_catagory = received.get('major_catagory'),
            link = received.get('link')
        )

        PatentAuthor.objects.create(
            applicant = User.objects.get(id=curusr),
            pid = pa,
            status = 3
        )
    elif type == 'prize':
        pra = Prize.objects.create(
            patent_num = received.get('patent_num'),
            promulgate_num = received.get('promulgate_num'),
            name = received.get('name'),
            applyer = received.get('applyer'),
            inventor = received.get('inventor'),
            issue = received.get('issue'),
            theme = received.get('theme'),
            catagory_num = received.get('catagory_num'),
            major_catagory = received.get('major_catagory'),
            link = received.get('link')
        )

        PrizeAuthor.objects.create(
            applicant = User.objects.get(id=curusr),
            pid = pra,
            status = 3
        )

    return HttpResponse('success')


def ApproveApply(request):
    received = json.loads(request.body)
    curusr = received.get('curusr')
    type = received.get('type')
    id = received.get('id')

    if curusr[2:4] == '01':
        return Response(status=403)

    if type == 'paper':
        apply = PaperAuthor.objects.get(pid__id=id)
        apply.status = 1
        apply.save()
    elif type == 'article':
        apply = NewspaperAuthor.objects.get(aid__id=id)
        apply.status = 1
        apply.save()
    elif type == 'confpaper':
        apply = ConferenceAuthor.objects.get(cpid__id=id)
        apply.status = 1
        apply.save()
    elif type == 'book':
        apply = BookAuthor.objects.get(isbn__isbn=id)
        apply.status = 1
        apply.save()
    elif type == 'prize':
        apply = PrizeAuthor.objects.get(prize_id__id=id)
        apply.status = 1
        apply.save()
    elif type == 'patent':
        apply = PatentAuthor.objects.get(patent_num__patent_num=id)
        apply.status = 1
        apply.save()
    elif type == 'prize':
        apply = PrizeAuthor.objects.get(prize_id__id=id)
        apply.status = 1
        apply.save()

    return HttpResponse('success')


def RejectApply(request):
    received = json.loads(request.body)
    curusr = received.get('curusr')
    type = received.get('type')
    id = received.get('id')

    if curusr[2:4] == '01':
        return Response(status=403)

    if type == 'paper':
        apply = PaperAuthor.objects.get(id=id)
        apply.status = 2
        apply.save()
    elif type == 'article':
        apply = NewspaperAuthor.objects.get(id=id)
        apply.status = 2
        apply.save()
    elif type == 'confpaper':
        apply = ConferenceAuthor.objects.get(id=id)
        apply.status = 2
        apply.save()
    elif type == 'book':
        apply = BookAuthor.objects.get(id=id)
        apply.status = 2
        apply.save()
    elif type == 'patent':
        apply = PatentAuthor.objects.get(id=id)
        apply.status = 2
        apply.save()
    elif type == 'patent':
        apply = PrizeAuthor.objects.get(id=id)
        apply.status = 2
        apply.save()

    return HttpResponse('success')


class AchiSet:
    def __init__(self):
        self.paper = 0
        self.article = 0
        self.confpaper = 0
        self.book = 0
        self.patent = 0
        self.prize = 0

class AchiSetEncoder(json.JSONEncoder):
    def default(self, o):
        return o.__dict__


def GetStatByYear(request):
    received = json.loads(request.body)
    curusr = received.get('curusr')
    year = received.get('year')

    if curusr[2:4] == '01':
        result = dict()
        for apply in PaperAuthor.objects.filter(status=1, applicant__id=curusr):
            year = Paper.objects.get(id=apply.pid.id).publish_date.year
            if year in result:
                result[year].paper += 1
            else:
                result[year] = AchiSet()
                result[year].paper = 1
        for apply in NewspaperAuthor.objects.filter(status=1, applicant__id=curusr):
            year = Article.objects.get(id=apply.aid.id).publish_date.year
            if year in result:
                result[year].article += 1
            else:
                result[year] = AchiSet()
                result[year].article = 1
        for apply in ConferenceAuthor.objects.filter(status=1, applicant__id=curusr):
            year = ConferencePaper.objects.get(id=apply.cpid.id).publish_date.year
            if year in result:
                result[year].confpaper += 1
            else:
                result[year] = AchiSet()
                result[year].confpaper = 1
        for apply in BookAuthor.objects.filter(status=1, applicant__id=curusr):
            try:
                year = Book.objects.get(isbn=apply.isbn.isbn).publish_year.year
                if year in result:
                    result[year].book += 1
                else:
                    result[year] = AchiSet()
                    result[year].book = 1
            except:
                pass
        for apply in PatentAuthor.objects.filter(status=1, applicant__id=curusr):
            year = Patent.objects.get(patent_num=apply.patent_num.patent_num).apply_date.year
            if year in result:
                result[year].patent += 1
            else:
                result[year] = AchiSet()
                result[year].patent = 1
        for apply in PrizeAuthor.objects.filter(status=1, applicant__id=curusr):
            year = Prize.objects.get(id=apply.prize_id.id).apply_date.year
            if year in result:
                result[year].prize += 1
            else:
                result[year] = AchiSet()
                result[year].prize = 1

        return HttpResponse(json.dumps(result, cls=AchiSetEncoder), content_type="application/json")

    elif curusr[2:4] == '02':
        result = dict()

        pa = PaperAuthor.objects.filter(status=1, applicant__id__startswith=curusr[0:2])
        p = pa.values('pid')
        for y in range(1990, 2024):
            result[y] = AchiSet()
            result[y].paper = p.filter(pid__publish_date__year=y).count()

        na = NewspaperAuthor.objects.filter(status=1, applicant__id__startswith=curusr[0:2])
        a = na.values('aid')
        for y in range(1990, 2024):
            result[y].article = a.filter(aid__publish_date__year=y).count()

        ca = ConferenceAuthor.objects.filter(status=1, applicant__id__startswith=curusr[0:2])
        cp = ca.values('cpid')
        for y in range(1990, 2024):
            result[y].confpaper = cp.filter(cpid__publish_date__year=y).count()

        ba = BookAuthor.objects.filter(status=1, applicant__id__startswith=curusr[0:2])
        b = ba.values('isbn')
        for y in range(1990, 2024):
            result[y].book = b.filter(isbn__publish_year__year=y).count()

        pa = PatentAuthor.objects.filter(status=1, applicant__id__startswith=curusr[0:2])
        p = pa.values('patent_num')
        for y in range(1990, 2024):
            result[y].patent = p.filter(patent_num__apply_date__year=y).count()

        pra = PrizeAuthor.objects.filter(status=1, applicant__id__startswith=curusr[0:2])
        pr = pra.values('prize_id')
        for y in range(1990, 2024):
            result[y].prize = pr.filter(prize_id__apply_date__year=y).count()

        return HttpResponse(json.dumps(result, cls=AchiSetEncoder), content_type="application/json")

    elif curusr[2:4] == '03':
        result = dict()

        pa = PaperAuthor.objects.filter(status=1)
        p = pa.values('pid')
        for y in range(1990, 2024):
            result[y] = AchiSet()
            result[y].paper = p.filter(pid__publish_date__year=y).count()

        na = NewspaperAuthor.objects.filter(status=1)
        a = na.values('aid')
        for y in range(1990, 2024):
            result[y].article = a.filter(aid__publish_date__year=y).count()

        ca = ConferenceAuthor.objects.filter(status=1)
        cp = ca.values('cpid')
        for y in range(1990, 2024):
            result[y].confpaper = cp.filter(cpid__publish_date__year=y).count()

        ba = BookAuthor.objects.filter(status=1)
        b = ba.values('isbn')
        for y in range(1990, 2024):
            result[y].book = b.filter(isbn__publish_year__year=y).count()

        pa = PatentAuthor.objects.filter(status=1)
        p = pa.values('patent_num')
        for y in range(1990, 2024):
            result[y].patent = p.filter(patent_num__apply_date__year=y).count()

        pra = PrizeAuthor.objects.filter(status=1)
        pr = pra.values('prize_id')
        for y in range(1990, 2024):
            result[y].prize = pr.filter(prize_id__apply_date__year=y).count()

        return HttpResponse(json.dumps(result, cls=AchiSetEncoder), content_type="application/json")



def GetStatByCollege(request):
    collegelist = [ (c.id, c.name) for c in College.objects.all() ] 

    result = dict()

    for (c, n) in collegelist:
        result[n] = AchiSet()
        result[n].paper = PaperAuthor.objects.filter(status=1, applicant__id__startswith='%02d' % c).count()
        result[n].article = NewspaperAuthor.objects.filter(status=1, applicant__id__startswith='%02d' % c).count()
        result[n].confpaper = ConferenceAuthor.objects.filter(status=1, applicant__id__startswith='%02d' % c).count()
        result[n].book = BookAuthor.objects.filter(status=1, applicant__id__startswith='%02d' % c).count()
        result[n].patent = PatentAuthor.objects.filter(status=1, applicant__id__startswith='%02d' % c).count()
        result[n].prize = PrizeAuthor.objects.filter(status=1, applicant__id__startswith='%02d' % c).count()

    return HttpResponse(json.dumps(result, cls=AchiSetEncoder), content_type="application/json")



def GetStatByType(request):
    received = json.loads(request.body)
    curusr = received.get('curusr')
    achi = AchiSet()

    if curusr[2:4] == '01':
        achi.paper = PaperAuthor.objects.filter(status=1, applicant__id=curusr).count()
        achi.article = NewspaperAuthor.objects.filter(status=1, applicant__id=curusr).count()
        achi.confpaper = ConferenceAuthor.objects.filter(status=1, applicant__id=curusr).count()
        achi.book = BookAuthor.objects.filter(status=1, applicant__id=curusr).count()
        achi.patent = PatentAuthor.objects.filter(status=1, applicant__id=curusr).count()
        achi.prize = PrizeAuthor.objects.filter(status=1, applicant__id=curusr).count()
        return HttpResponse(json.dumps(achi, cls=AchiSetEncoder), content_type="application/json")

    elif curusr[2:4] == '02':
        achi.paper = PaperAuthor.objects.filter(status=1, applicant__id__startswith=curusr[0:2]).count()
        achi.article = NewspaperAuthor.objects.filter(status=1, applicant__id__startswith=curusr[0:2]).count()
        achi.confpaper = ConferenceAuthor.objects.filter(status=1, applicant__id__startswith=curusr[0:2]).count()
        achi.book = BookAuthor.objects.filter(status=1, applicant__id__startswith=curusr[0:2]).count()
        achi.patent = PatentAuthor.objects.filter(status=1, applicant__id__startswith=curusr[0:2]).count()
        achi.prize = PrizeAuthor.objects.filter(status=1, applicant__id__startswith=curusr[0:2]).count()
        return HttpResponse(json.dumps(achi, cls=AchiSetEncoder), content_type="application/json")

    elif curusr[2:4] == '03':
        achi.paper = PaperAuthor.objects.filter(status=1).count()
        achi.article = NewspaperAuthor.objects.filter(status=1).count()
        achi.confpaper = ConferenceAuthor.objects.filter(status=1).count()
        achi.book = BookAuthor.objects.filter(status=1).count()
        achi.patent = PatentAuthor.objects.filter(status=1).count()
        achi.prize = PrizeAuthor.objects.filter(status=1).count()
        return HttpResponse(json.dumps(achi, cls=AchiSetEncoder), content_type="application/json")
