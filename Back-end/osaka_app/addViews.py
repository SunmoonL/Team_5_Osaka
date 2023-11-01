from django.shortcuts import render, HttpResponse
from osaka_app.models import QuestionList
from django.http import JsonResponse
import openai

openai.api_key = "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"

class GptOb:
    __user_list = {}
    
    @staticmethod
    def append_user(user_key):
        GptOb.__user_list[user_key] = []

    @staticmethod
    def getter_userlist(user_key):
        return GptOb.__user_list[user_key]
    
    @staticmethod
    def append_assistant_a(user_key, text):
        GptOb.__user_list[user_key].append({"role": "assistant", "content": text})

    @staticmethod
    def append_user_q(user_key, text):
        GptOb.__user_list[user_key].append({"role": "user", "content": text})

    @staticmethod
    def del_user(delete_key): #user_key대표키 (지역빠진걸로 받음) GptOb.__user_list.pop(delete_key, None)
        for user_key, value in list(GptOb.__user_list.items()):
            if delete_key in user_key:
                del GptOb.__user_list[user_key]

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
    questionItem = QuestionList.objects.filter(title_address=req.POST["title_address"])
    if questionItem:
        return HttpResponse("중복")
    else:
        QuestionList.objects.create(title_address = req.POST["title_address"], question_text = req.POST["question_text"])
        return HttpResponse("succes")

def question_delete(req):
    questionItem = QuestionList.objects.get(title_address = req.POST["title_address"])
    questionItem.delete()
    return HttpResponse("succes")

def in_region(request): #어떤 지역 클릭해서 딱 들어왔을때 
    user_key = request.GET['user_key']
    GptOb.append_user(user_key)
    region = request.GET['user_key'].split("_")[1]
    q_result = QuestionList.objects.get(title_address=f"{region}_이지역에 대해 소개해줘")
    GptOb.append_user_q(user_key, q_result.title_address)
    GptOb.append_assistant_a(user_key, q_result.question_text)
    print(GptOb.getter_userlist(user_key))
    return HttpResponse(q_result.question_text)

def answer_q_list(request): #질문리스트에 있는 질문 클릭, 
    title_address = request.GET['title_address']
    user_key = request.GET['user_key']
    q_result = QuestionList.objects.get(title_address=title_address)
    GptOb.append_user_q(user_key, f"이곳은 {q_result.title_address.split('_')[0]}이다.{q_result.title_address.split('_')[1]}")
    GptOb.append_assistant_a(user_key, q_result.question_text)
    print(GptOb.getter_userlist(user_key))
    return HttpResponse(q_result.question_text)


def answer_gpt(request): #사용자가 질문창으로 질문함
    selected_region = request.GET['user_key'].split("_")[1]

    GptOb.append_user_q(request.GET['user_key'], f"이곳은 {selected_region}이다. {request.GET['title_address']}") #userkey : 랜덤값_지역
    messages = GptOb.getter_userlist(request.GET['user_key'])
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
        functions = [
            {
                "name": "result",
                "description": "주어진 주제에 답변하기",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "result": {
                            "type": "string",
                            "description": "주어진 주제에 답변하기",
                        }
                    },
                    "required": ["result"],
                },
            }
        ]
    )
    assistant_content = ""
    try:
        assistant_content = completion.choices[0].message["function_call"]["arguments"]["result"]
        GptOb.append_assistant_a(request.GET['user_key'], assistant_content)
    except:
        assistant_content = completion.choices[0].message["content"].strip()
        GptOb.append_assistant_a(request.GET['user_key'], assistant_content)

    return HttpResponse(assistant_content)


def del_user(request):
    user_key = request.GET['user_key'] #_지역 없는 대표값으로 받음
    GptOb.del_user(user_key)
    return HttpResponse("sc")