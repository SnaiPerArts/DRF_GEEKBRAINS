from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from .models import UserInfo
from .serializer import UserInfoModelSerializer

class UserInfoModelViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    serializer_class = UserInfoModelSerializer
    queryset = UserInfo.objects.all().order_by('id')