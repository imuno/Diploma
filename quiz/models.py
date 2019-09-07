from django.db import models

class Quiz(models.Model):
    type = models.CharField(max_length=5000, blank=True)
    type_description = models.CharField(max_length=5000, blank=True)

    def __str__(self):
        return self.type
