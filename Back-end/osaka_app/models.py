from django.db import models

class QuestionList(models.Model):
    title_address = models.CharField(max_length=200, unique=True)
    question_text = models.TextField()