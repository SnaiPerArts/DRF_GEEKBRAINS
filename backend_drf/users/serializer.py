from .models import UserInfo
from rest_framework.serializers import ModelSerializer

class UserInfoModelSerializer(ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ['id', 'username', 'first_name', 'last_name', 'email']