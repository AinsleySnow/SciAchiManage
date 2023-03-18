from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    id = models.CharField(max_length=7, primary_key=True)

    class Type(models.IntegerChoices):
        RESEARCHER = 1
        ASSISTANT = 2
        ADMIN = 3
    type = models.IntegerField(choices=Type.choices)

    name = models.CharField(max_length=10)
    passwd = models.CharField(max_length=32)

    class Sex(models.IntegerChoices):
        MALE = 1
        FEMALE = 2
    sex = models.IntegerField(choices=Sex.choices)

    dept = models.CharField(max_length=45)



class Researcher(models.Model):
    rid = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        to_field='id'
    )
    dept = models.CharField(max_length=50)
    position = models.CharField(max_length=10, blank=True)
    profile = models.TextField(blank=True)
    work = models.TextField(blank=True)
    photo = models.ImageField(blank=True)



class Journal(models.Model):
    issn = models.CharField(max_length=8, primary_key=True)
    title = models.CharField(max_length=45)
    host = models.CharField(max_length=100)

    class Period(models.IntegerChoices):
        monthly = 1
        seasonly = 2
    period = models.IntegerField(choices=Period.choices)

    inf_factor = models.FloatField(blank=True)
    
    class Zone(models.IntegerChoices):
        first = 1
        second = 2
        third = 3
        fourth = 4
    zone = models.IntegerField(choices=Period.choices, blank=True)

    picture = models.ImageField(blank=True)
    link = models.CharField(max_length=400, blank=True),



class Paper(models.Model):
    applynum = models.CharField(max_length=30, primary_key=True)
    issn = models.ForeignKey(
        Journal,
        on_delete=models.CASCADE,
        to_field='issn'
    )
    title = models.CharField(max_length=45)
    author = models.CharField(max_length=200)
    link = models.CharField(max_length=400, blank=True)



class Newspaper(models.Model):
    issn = models.CharField(max_length=8, primary_key=True)
    title = models.CharField(max_length=45)
    authority = models.CharField(max_length=100)
    host = models.CharField(max_length=100)
    city = models.CharField(max_length=30)
    address = models.CharField(max_length=500)
    postcode = models.CharField(max_length=6)
    phone_num = models.CharField(max_length=11, blank=True)
    picture = models.ImageField(blank=True)
    link = models.CharField(max_length=400, blank=True)



class Article(models.Model):
    applynum = models.CharField(max_length=30, primary_key=True)
    issn = models.ForeignKey(
        Newspaper,
        on_delete=models.CASCADE,
        to_field='issn'
    )
    title = models.CharField(max_length=45)
    author = models.CharField(max_length=200)
    link = models.CharField(max_length=400, blank=True)



class Conference(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=300)
    time = models.DateField()
    place = models.CharField(max_length=100)
    association = models.CharField(max_length=100)
    publisher = models.CharField(max_length=100, blank=True)
    publish_date = models.DateField(blank=True)
    chief_editor = models.CharField(max_length=10, blank=True)
    editors = models.CharField(max_length=300, blank=True)
    picture = models.ImageField(blank=True)
    link = models.CharField(max_length=400, blank=True)



class ConferencePaper(models.Model):
    applynum = models.CharField(max_length=30, primary_key=True)
    id = models.ForeignKey(
        Conference,
        on_delete=models.CASCADE,
        to_field='id'
    )
    title = models.CharField(max_length=300)
    author = models.CharField(max_length=200)
    link = models.CharField(max_length=400, blank=True)



class Book(models.Model):
    applynum = models.CharField(max_length=30, unique=True)
    isbn = models.CharField(max_length=13, primary_key=True)
    author = models.CharField(max_length=300)
    publisher = models.CharField(max_length=100)
    publish_year = models.DateField()
    place_published = models.CharField(max_length=100)
    picture = models.ImageField(blank=True)
    link = models.CharField(max_length=400, blank=True),



class Patent(models.Model):
    applynum = models.CharField(max_length=30, unique=True)
    patent_num = models.CharField(max_length=13, primary_key=True)
    promulgate_num = models.CharField(max_length=12)
    name = models.CharField(max_length=200)
    applyer = models.CharField(max_length=200)
    inventor = models.CharField(max_length=200)
    issue = models.CharField(max_length=45)
    theme = models.CharField(max_length=45)
    catagory_num = models.CharField(max_length=100)
    major_catagory = models.CharField(max_length=10)
    link = models.CharField(max_length=400, blank=True),



class JournalAuthor(models.Model):
    applynum = models.CharField(max_length=30, primary_key=True)
    applicant = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        to_field='id'
    )
    issn = models.ForeignKey(
        Journal,
        on_delete=models.CASCADE,
        to_field='issn'
    )

    class Status(models.IntegerChoices):
        PROCESSED = 1
        PROCESSING = 2
    status = models.IntegerField(choices=Status.choices)



class NewspaperAuthor(models.Model):
    applynum = models.CharField(max_length=30, primary_key=True)
    applicant = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        to_field='id'
    )
    issn = models.ForeignKey(
        Newspaper,
        on_delete=models.CASCADE,
        to_field='issn'
    )

    class Status(models.IntegerChoices):
        PROCESSED = 1
        PROCESSING = 2
    status = models.IntegerField(Status.choices)



class ConferenceAuthor(models.Model):
    applynum = models.CharField(max_length=30, primary_key=True)
    applicant = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        to_field='id'
    )
    id = models.ForeignKey(
        Conference,
        on_delete=models.CASCADE,
        to_field='id'
    )

    class Status(models.IntegerChoices):
        PROCESSED = 1
        PROCESSING = 2
    status = models.IntegerField(Status.choices)



class BookAuthor(models.Model):
    applynum = models.CharField(max_length=30, primary_key=True)
    applicant = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        to_field='id'
    )
    isbn = models.ForeignKey(
        Book,
        on_delete=models.CASCADE,
        to_field='isbn'
    )

    class Status(models.IntegerChoices):
        PROCESSED = 1
        PROCESSING = 2
    status = models.IntegerField(choices=Status.choices)



class PatentAuthor(models.Model):
    applynum = models.CharField(max_length=30, primary_key=True)
    applicant = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        to_field='id'
    )
    patent_num = models.ForeignKey(
        Patent,
        on_delete=models.CASCADE,
        to_field='patent_num'
    )

    class Status(models.IntegerChoices):
        PROCESSED = 1
        PROCESSING = 2
    status = models.IntegerField(choices=Status.choices)
