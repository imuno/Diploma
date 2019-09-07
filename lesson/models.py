from django.db import models

class Lesson(models.Model):
    title = models.CharField(max_length=5000, blank=True)
    lesson_description = models.CharField(max_length=5000, blank=True)

    def __str__(self):
        return self.title
