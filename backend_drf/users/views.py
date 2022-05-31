from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.decorators import action
from .models import UserInfo
from .serializer import UserInfoModelSerializer, UserInfoModelSerializerExtended

class UserInfoModelViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    #serializer_class = UserInfoModelSerializer
    queryset = UserInfo.objects.all().order_by('id')

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return UserInfoModelSerializerExtended
        return UserInfoModelSerializer