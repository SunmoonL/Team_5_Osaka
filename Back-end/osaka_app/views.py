from django.shortcuts import render, HttpResponse
from osaka_app.addViews import *

def index(req):
    return HttpResponse("hi")
