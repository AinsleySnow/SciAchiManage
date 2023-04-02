from rest_framework import serializers
from . models import *
  
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'type', 'name', 'passwd', 'sex', 'dept']

class ResearcherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Researcher
        fields = ['id', 'dept', 'position', 'profile', 'work', 'photo']

class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = ['id', 'name']


class JournalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Journal
        fields = ['issn', 'title', 'host', 'period', 'inf_factor', 'zone', 'picture', 'link']

class NewspaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Newspaper
        fields = ['issn', 'title', 'authority', 'host', 'city', 'address', 'postcode', 'phone_num', 'picture', 'link']

class ConferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conference
        fields = ['id', 'name', 'time', 'place', 'association', 'publisher', 'publish_date', 'chief_editor', 'link']

class PaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paper
        fields = [ 'id', 'issn', 'title', 'author', 'page', 'volume', 'number', 'publish_date', 'link']

class ConfpaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConferencePaper
        fields = ['id', 'title', 'author', 'page', 'publish_date', 'link']

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'issn', 'title', 'author', 'version', 'publish_date', 'link']
