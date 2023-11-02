from django.db import models

class QuestionList(models.Model):
    title_address = models.CharField(max_length=200, unique=True)
    question_text = models.TextField()
    first_link = models.TextField(null=True, default="")
    second_link = models.TextField(null=True, default="")
    third_link = models.TextField(null=True, default="")
    fourth_link = models.TextField(null=True, default="")