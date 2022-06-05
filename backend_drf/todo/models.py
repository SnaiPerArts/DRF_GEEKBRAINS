from django.db import models
from users.models import UserInfo

class Project(models.Model):
    name = models.CharField(max_length=128, unique=True)
    repository_url = models.URLField(blank=True)
    users = models.ManyToManyField(UserInfo)

    def __str__(self):
        return self.name

class Note(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    author = models.ForeignKey(UserInfo, on_delete=models.CASCADE)
    body = models.TextField()
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=False)