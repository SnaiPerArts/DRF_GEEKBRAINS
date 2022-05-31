import graphene
from graphene_django import DjangoObjectType
from users.models import UserInfo
from todo.models import Note, Project

class NoteType(DjangoObjectType):
    class Meta:
        model = Note
        fields = '__all__'

class UserInfoType(DjangoObjectType):
    class Meta:
        model = UserInfo
        fields = '__all__'

class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'

class Query(graphene.ObjectType):
    all_note = graphene.List(NoteType)
    all_users = graphene.List(UserInfoType)
    all_projects = graphene.List(ProjectType)
    user_by_id = graphene.Field(UserInfoType, id=graphene.Int(required=True))
    projects_by_todos_text = graphene.List(ProjectType, text=graphene.String(required=False))

    def resolve_all_note(root, info):
        return Note.objects.all()

    def resolve_all_users(root, info):
        return UserInfo.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_user_by_id(self, info, id):
        try:
            return UserInfo.objects.get(id=id)
        except UserInfo.DoesNotExist:
            return None

    def resolve_projects_by_todos_text(self, info, text=None):
        projects = Project.objects.all()
        if text:
            projects = projects.filter(todos__text=text)
        return projects

class ProjectMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        id = graphene.ID()

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, name, id):
        project = Project.objects.get(pk=id)
        project.name = name
        project.save()
        return ProjectMutation(project=project)

class Mutation(graphene.ObjectType):
    update_project = ProjectMutation.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)