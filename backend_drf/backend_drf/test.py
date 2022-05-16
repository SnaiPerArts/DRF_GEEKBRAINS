from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient, APITestCase
from mixer.backend.django import mixer
from users.models import UserInfo
from users.views import UserInfoModelViewSet
from todo.models import Note, Project

class TestUserViewSet(TestCase):
    def test_get_list_quest(self):
        factory = APIRequestFactory()
        request = factory.get('/api/userinfo')
        view = UserInfoModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_detail_admin(self):
        username = 'TestUser'
        email = 'developer@todolist.com'
        password='testadmin'
        admin = UserInfo.objects.create_superuser(username=username, email=email, password=password)
        client = APIClient()
        client.login(username=username, password=password)
        response = client.get(f'/api/userinfo/{admin.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class TestToDoViewSet(APITestCase):

    def test_get_list(self):
        username = 'TestUser'
        email = 'developer@todolist.com'
        password='testadmin'
        admin = UserInfo.objects.create_superuser(username=username, email=email, password=password)
        self.client.login(username=username, password=password)
        response = self.client.get(f'/api/userinfo/{admin.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        project = mixer.blend(Project, name='Test Admin Project')
        response = self.client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name, 'Test Admin Project')

        todo = mixer.blend(Note, project=project, author=admin)
        response = self.client.get(f'/api/notes/{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        todo = Note.objects.get(id=todo.id)
        self.assertEqual(todo.project, project)
        self.assertEqual(todo.author, admin)