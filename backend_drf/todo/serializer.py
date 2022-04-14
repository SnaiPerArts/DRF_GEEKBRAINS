from rest_framework.serializers import ModelSerializer
from todo.models import Project, Note
from users.serializer import UserInfoModelSerializer

class ProjectModelSerializer(ModelSerializer):
    users = UserInfoModelSerializer(many=True)
    class Meta:
        model = Project
        fields = '__all__'

class NoteModelSerializer(ModelSerializer):
    project = ProjectModelSerializer()
    author = UserInfoModelSerializer()
    class Meta:
        model = Note
        fields = '__all__'