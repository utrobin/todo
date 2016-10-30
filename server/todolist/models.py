from django.db import models
from django.utils import timezone


class Todo(models.Model):
    title = models.CharField(max_length=128)
    description = models.TextField(max_length=16384, blank=True)
    added_at = models.DateTimeField(default=timezone.now)
    views = models.PositiveSmallIntegerField(default=0)
    tags = models.ManyToManyField('Tags', blank=True)
    completed = models.BooleanField(default=False)
    deleted = models.BooleanField(default=False)


class Tags(models.Model):
    title = models.CharField(max_length=64)