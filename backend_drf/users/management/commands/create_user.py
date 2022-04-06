from django.core.management.base import BaseCommand
from users.models import UserInfo

def create_superuser(
        username='admin',
        password='admin',
        email='admin@admin.admin',
        first_name="Denis",
        last_name="Prusakov"):

    user = UserInfo.objects.create_superuser(username=username,
                                         email=email,
                                         first_name=first_name,
                                         last_name=last_name,
                                         password=password)
    return user

class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('count', nargs='?', type=int, default=5)
    def handle(self, *args, **options):
        UserInfo.objects.all().delete()
        su = create_superuser()
        print(f'Superuser {su} was created')
        count = options['count']
        for i in range(count):
            user = UserInfo.objects.create_user(username=f'user{i}',
                                            first_name=f'fname{i}',
                                            last_name=f'lname{i}',
                                            email=f'{i}@mail.com')
            print(f'User {user} was created')
        print('Done')