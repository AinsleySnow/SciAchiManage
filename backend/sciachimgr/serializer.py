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
