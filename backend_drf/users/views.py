from rest_framework.viewsets import ModelViewSet
from .models import UserInfo
from .serializer import UserInfoModelSerializer

class UserInfoModelViewSet(ModelViewSet):
    serializer_class = UserInfoModelSerializer
    queryset = UserInfo.objects.all().order_by('id')