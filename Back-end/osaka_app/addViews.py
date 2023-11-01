from django.shortcuts import render, HttpResponse
from osaka_app.models import QuestionList
from django.http import JsonResponse

def index2(req):
    return HttpResponse("addViews")

def question_list(req): #리스트 보기
    q_list = QuestionList.objects.all()
    res_ob = { "res_list" : []}
    for q in q_list:
        res_ob["res_list"].append({"title_address" : q.title_address, "question_text" : q.question_text})
    return JsonResponse(res_ob)

def qestion_view(req): 
    questionItem = QuestionList.objects.get(title_address = req.POST["title_address"])
    return JsonResponse({"title_address" : questionItem.title_address, "question_text" : questionItem.question_text})

def question_create(req):
    questionItem = QuestionList.objects.create(title_address = req.POST["title_address"], question_text = req.POST["question_text"])
    return HttpResponse("succes")

def question_delete(req):
    questionItem = QuestionList.objects.get(title_address = req.POST["title_address"])
    questionItem.delete()