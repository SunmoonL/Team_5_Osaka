from django.shortcuts import render, HttpResponse
from osaka_app.models import QuestionList

def index2(req):
    return HttpResponse("addViews")