from django.shortcuts import render, HttpResponse
from osaka_app.models import QuestionList
from django.http import JsonResponse
import openai
from osaka_app import key


openai.api_key = key.api_key


class GptOb:
    __user_list = {}
    
    @staticmethod
    def append_user(user_key):
        GptOb.__user_list[user_key] = [{"role": "system", "content": "당신은 오사카 여행 가이드이다."}]

    @staticmethod
    def append_user2(user_key):#------------------------이걸로바뀜
        selected_region = user_key.split("_")[1]
        GptOb.__user_list[user_key] = [{"role": "system", "content": f"당신은 오사카 여행 {selected_region} 지역 가이드이다."}]

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

    @staticmethod
    def del_last_q(user_key): #해당 유저 마지막요소 삭제 -(질문취소할때 사용)
        del GptOb.__user_list[user_key][len(GptOb.__user_list[user_key]) - 1]

    @staticmethod
    def max_max_tokens_prevention(user_key):
        del GptOb.__user_list[user_key][3:7]



def question_list(request): #리스트 보기
    q_list = QuestionList.objects.all()
    res_ob = { "res_list" : []}
    for q in q_list:
        res_ob["res_list"].append({"title_address" : q.title_address, "question_text" : q.question_text, "first_link" : q.first_link, "second_link" : q.second_link, "third_link" : q.third_link, "fourth_link" : q.fourth_link })
    return JsonResponse(res_ob)

def qestion_view(request): 
    questionItem = QuestionList.objects.get(title_address = request.POST["title_address"])
    return JsonResponse({"title_address" : questionItem.title_address, "question_text" : questionItem.question_text, "first_link" : questionItem.first_link, "second_link" : questionItem.second_link, "third_link" : questionItem.third_link, "fourth_link" : questionItem.fourth_link})

def question_create(request):
    if QuestionList.objects.filter(title_address=request.POST["title_address"]).exists():
        QuestionList.objects.filter(title_address=request.POST["title_address"]).update(question_text = request.POST["question_text"], first_link = request.POST["first_link"], second_link = request.POST["second_link"], third_link = request.POST["third_link"], fourth_link = request.POST["fourth_link"])
        return HttpResponse("succes")
    else:
        QuestionList.objects.create(title_address = request.POST["title_address"], question_text = request.POST["question_text"], first_link = request.POST["first_link"], second_link = request.POST["second_link"], third_link = request.POST["third_link"], fourth_link = request.POST["fourth_link"])
        return HttpResponse("succes")

def question_delete(reqest):
    questionItem = QuestionList.objects.get(title_address = reqest.POST["title_address"])
    questionItem.delete()
    return HttpResponse("succes")

def in_region(request): #어떤 지역 클릭해서 딱 들어왔을때 
    user_key = request.GET['user_key']
    GptOb.append_user(user_key) #새로운 유저리스트 추가
    region = request.GET['user_key'].split("_")[1]
    q_result = QuestionList.objects.get(title_address=f"{region}_지역에 대해 소개해줘")
    GptOb.append_user_q(user_key, q_result.title_address.split("_")[0] + q_result.title_address.split("_")[1])
    GptOb.append_assistant_a(user_key, q_result.question_text)
    print(GptOb.getter_userlist(user_key))
    return HttpResponse(q_result.question_text)

def in_region2(request): #이걸로 바꿀거 
    user_key = request.GET['user_key']
    GptOb.append_user(user_key) #새로운 유저리스트 추가
    region = request.GET['user_key'].split("_")[1]
    q_result = QuestionList.objects.get(title_address=f"{region}_지역에 대해 소개해줘")
    GptOb.append_user_q(user_key, q_result.title_address.split("_")[0] + q_result.title_address.split("_")[1])
    GptOb.append_assistant_a(user_key, q_result.question_text)
    region_q_list = QuestionList.objects.filter(title_address__contains=region) & QuestionList.objects.filter(title_address__contains="추천")
    for region_q in region_q_list:
        GptOb.append_user_q(user_key, region_q.title_address.split("_")[1])
        GptOb.append_assistant_a(user_key, region_q.question_text)
    print(GptOb.getter_userlist(user_key))
    return HttpResponse(q_result.question_text)

def answer_q_list(request): #질문리스트에 있는 질문 클릭, 
    title_address = request.GET['title_address']
    user_key = request.GET['user_key']
    q_result = QuestionList.objects.get(title_address = user_key.split('_')[1] + "_" + title_address)
    GptOb.append_user_q(user_key, q_result.title_address.split('_')[1])
    GptOb.append_assistant_a(user_key, q_result.question_text)
    print(GptOb.getter_userlist(user_key))
    return HttpResponse(q_result.question_text)

def answer_q_list2(request): #바뀐데이터에 따라 이 함수로 사용
    title_address = request.GET['title_address']
    user_key = request.GET['user_key']
    q_result = QuestionList.objects.get(title_address = user_key.split('_')[1] + "_" + title_address)
    response_ob = {"answer_list": [], "category" : "q_list_data"}
    title_keyword = title_address[3:].split(" ")[0]
    response_ob["answer_list"].append({"keyword" : title_keyword, "question_text" : q_result.question_text, "first_link" : q_result.first_link, "second_link" : q_result.second_link, "third_link" : q_result.third_link, "fourth_link" : q_result.fourth_link})
    return JsonResponse(response_ob)

def answer_gpt(request): #사용자가 질문창으로 질문함
    selected_region = request.GET['user_key'].split("_")[1]
    print(selected_region)
    print(request.GET["user_key"])
    print(request.GET["title_address"])
    keyword_list = ["숙소", "맛집", "관광지"]
    denial_list = ["외", "다른", "말고", "그밖에", "아니"]
    denial_chek = False
    for keyword in [*keyword_list]:
        if keyword not in request.GET["title_address"]:
            keyword_list.remove(keyword)
    #키워드 한개라도 포함하면 그때 검사
    if len(keyword_list) != 0:
        for denial in denial_list:
            if denial in request.GET["title_address"]:
                denial_chek = True
                break

    if len(keyword_list) != 0 and denial_chek == False: #질문리스트 키워드 한개라도 포함, 예외단어 포함하지않을때만 DB에서 가져와서 리턴
        json_ob = {"answer_list": [], "category" : "q_list_data"}
        for keyword in keyword_list:
            q_result_list = QuestionList.objects.filter(title_address__contains=keyword) & QuestionList.objects.filter(title_address__contains=selected_region)
            for q_result in q_result_list:
                json_ob["answer_list"].append({"keyword" : keyword, "question_text" : q_result.question_text, "first_link" : q_result.first_link, "second_link" : q_result.second_link, "third_link" : q_result.third_link, "fourth_link" : q_result.fourth_link})
        print(json_ob)
        return JsonResponse(json_ob)

    
    def gpt_api_request(messages,user_key):
        print( "메세지:", messages)
        completion = openai.ChatCompletion.create(
            model = "gpt-3.5-turbo",
            messages = messages,
            temperature = 0,
            top_p = 0.5
        )
        '''
        if completion.choices[0].message.get("function_call") != None:
            assistant_content = completion.choices[0].message["function_call"]["arguments"]["result"].strip()
            GptOb.append_assistant_a(user_key, assistant_content)
            return assistant_content
        
        else:
            assistant_content = completion.choices[0].message["content"].strip()
            GptOb.append_assistant_a(user_key, assistant_content)
            return assistant_content
        '''
        assistant_content = completion.choices[0].message["content"].strip()
        GptOb.append_assistant_a(user_key, assistant_content)
        return assistant_content




    def gpt_api_request2(messages,user_key): #-----------------------------------바뀔거
        selected_region = user_key.split("_")[1]
        region_model_list = {"이케다" : "ft:gpt-3.5-turbo-0613:osaka::8IEirXmE", "도톤보리" : "ft:gpt-3.5-turbo-0613:osaka::8IO3UnwV"}
        completion = openai.ChatCompletion.create(
            model = region_model_list[selected_region],
            messages = messages,
            temperature = 0,
            top_p = 0.5,
            stop="5",
            #n=1,
        )
        assistant_content = completion.choices[0].message["content"].strip()
        GptOb.append_assistant_a(user_key, assistant_content)
        return assistant_content


               
    GptOb.append_user_q(request.GET['user_key'], f"{selected_region}에 갈 것이다. 오사카 여행 가이드의 입장에서 {request.GET['title_address']} 4개의 예시를 추천해줘.") #userkey : 랜덤값_지역
    #------------------------------------------------------------윗줄 이밑에껄로 바뀔거
    #GptOb.append_user_q(request.GET['user_key'], request.GET['title_address'])
    messages = GptOb.getter_userlist(request.GET['user_key'])
    assistant_content = ""
    try:
        assistant_content = gpt_api_request(messages, request.GET["user_key"])
        #assistant_content = gpt_api_request2(messages, request.GET["user_key"])----------------------------
    except openai.error.InvalidRequestError: #max_tokens 방지
        print("max_tokens방지 시작")
        GptOb.max_max_tokens_prevention(request.GET["user_key"])
        messages = GptOb.getter_userlist(request.GET["user_key"])
        #다시 요청------
        assistant_content = gpt_api_request(messages, request.GET["user_key"])
        #assistant_content = gpt_api_request2(messages, request.GET["user_key"])---------------------------
        print("max_tokens 방지 완료")
    except Exception as e:
        GptOb.del_last_q(request.GET['user_key'])
        assistant_content = "알맞은 답변을 찾지 못했습니다. 다시 질문해 주세요."
        print(e)
    finally:
        #print(GptOb.getter_userlist(request.GET['user_key']))
        print()
    json_ob = {"answer_list": [], "category" : "gpt_data"}
    json_ob["answer_list"].append({"question_text" : assistant_content})
    return JsonResponse(json_ob)


def del_user(request):
    user_key = request.GET['user_key'] #_지역 없는 그냥 유저 랜덤 키값으로 받음
    GptOb.del_user(user_key)
    return HttpResponse("sucess")
