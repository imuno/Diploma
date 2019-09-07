from django.db import models
from lesson.models import Lesson
from quiz.models import Question
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import(
    AbstractBaseUser, BaseUserManager
)

class UserManager(BaseUserManager):
    def create_user(self, username, first_name, last_name, password=None, is_active=True, is_staff=False, is_admin=False): # put full_name and other required fields in here
        if not username:
            raise ValueError("Users must have an username")
        if not password:
            raise ValueError("User must have a password")
        if not first_name:
            raise ValueError("User must have a first name")
        if not last_name:
            raise ValueError("User must have a last name")
        user_obj = self.model(
            username = username,
            first_name = first_name,
            last_name = last_name,
        )
        user_obj.set_password(password) # change user password
        user_obj.is_staff = is_staff
        user_obj.is_admin = is_admin
        user_obj.is_active = is_active
        user_obj.save(using=self._db)
        return user_obj

    def create_staffuser(self, email, first_name, last_name, password=None):
        user = self.create_user(
            username,
            first_name,
            last_name,
            password=password,
            is_staff=True
        )
        return user

    def create_superuser(self, username, first_name, last_name, password=None):
        user = self.create_user(
            username,
            first_name,
            last_name,
            password=password,
            is_staff=True,
            is_admin=True
        )
        return user

class User(AbstractBaseUser):
    username = models.CharField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False) #superuser
    timestamp = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'username'
    #emaill and password are required by default
    REQUIRED_FIELDS = ['first_name', 'last_name'] #['full_name'] #python manage.py createsuperuser

    objects = UserManager()

    def get_first_name(self):
        return self.first_name

    def get_last_name(self):
        return self.last_name

    def get_short_name(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    def __str__(self):
        return self.username

class UserLesson(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=250, blank=True)
    percent = models.FloatField(null=True, blank=True)
    lesson_description = models.CharField(max_length=5000, blank=True)

class UserQuiz(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=250, blank=True)
    percent = models.FloatField(null=True, blank=True)
    questions = models.ManyToManyField(Question)
