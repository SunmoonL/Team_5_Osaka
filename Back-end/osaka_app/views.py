from django.shortcuts import render, HttpResponse
from osaka_app.addViews import *
from osaka_app.models import QuestionList
import json

def index(req):
    a = QuestionList.objects.filter(title_address="test_test")
    print(a[0].title_address)
    return HttpResponse("aa")

def save_question_read(req):
    save_question = QuestionList.objects.get(title_address="test_test")
    save_json = {
        "result" : save_question.question_text
    }
    return HttpResponse(json.dumps(save_json))
