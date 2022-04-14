from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import get_object_or_404
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from todo.filters import NoteFilter, ProjectFilter
from todo.models import Project, Note
from todo.serializer import ProjectModelSerializer, NoteModelSerializer

class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10

class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter

class NoteLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20

class NoteModelViewSet(ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteModelSerializer
    pagination_class = NoteLimitOffsetPagination
    filterset_class = NoteFilter

    def destroy(self, request, pk=None, *args, **kwargs):
        note = get_object_or_404(Note, pk=pk)
        serializer = NoteModelSerializer(note, context={'request': request})
        note.is_active = False
        note.save()
        return Response(serializer.data)
