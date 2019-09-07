from django.db import models
from django.contrib.postgres.fields import ArrayField

class Question(models.Model):
    prompt = models.CharField(max_length=5000, blank=True)
    possible_answers = ArrayField(models.CharField(max_length=5000, blank=True),)
    correct_answer = models.CharField(max_length=5000, blank=True)

class Quiz(models.Model):
    title = models.CharField(max_length=5000, blank=True)
    questions = models.ManyToManyField(Question)

    def __str__(self):
        return self.title
