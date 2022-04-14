from django.contrib import admin
from todo.models import Project, Note

admin.site.register(Project)
admin.site.register(Note)