from django.shortcuts import render, HttpResponse
from osaka_app.models import QuestionList
from django.http import JsonResponse
import openai
from osaka_app import key
from osaka_app import food_list
'''
openai.api_key = key.api_key


class GptOb: #정적 클래스를 사용하여 유저마다 유효한 GPT 요청을 위한 질문&대답 리스트를 유지 및 관리
    __user_list = {}
    
    @staticmethod
    def append_user(user_key):
        GptOb.__user_list[user_key] = [{"role": "system", "content": "당신은 오사카 여행 가이드이다."}]

    @staticmethod
    def append_user2(user_key):#------------------------모델 여러개 사용시!!! 이걸로바뀜
        selected_region = user_key.split("_")[1]
        GptOb.__user_list[user_key] = [{"role": "system", "content": f"당신은 오사카 여행 {selected_region} 지역 가이드이다."}]

    @staticmethod
    def getter_userlist(user_key):
        return GptOb.__user_list[user_key] #인자로 받은 유저키에 해당하는 gpt질문&대답 리스트 추출
    
    @staticmethod
    def append_assistant_a(user_key, text):
        GptOb.__user_list[user_key].append({"role": "assistant", "content": text})

    @staticmethod
    def append_user_q(user_key, text):
        GptOb.__user_list[user_key].append({"role": "user", "content": text})

    @staticmethod
    def del_user(delete_key): #user_key대표키 (지역빠진걸로 받음)
        for user_key, value in list(GptOb.__user_list.items()):
            if delete_key in user_key:
                del GptOb.__user_list[user_key]

    @staticmethod
    def del_last_q(user_key): #해당 유저 마지막요소 삭제 -(질문취소할때 사용)
        del GptOb.__user_list[user_key][len(GptOb.__user_list[user_key]) - 1]

    @staticmethod
    def max_max_tokens_prevention(user_key):
        del GptOb.__user_list[user_key][3:7]
    
    @staticmethod
    def get_last_a(user_key): #gpt의 마지막답변 가져오기 - 답변끊겼을때 사용
        return GptOb.__user_list[user_key][len(GptOb.__user_list[user_key]) - 1]



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
    if QuestionList.objects.filter(title_address=request.POST["title_address"]).exists(): #존재하는 질문 컬림인지 검사 후 데이터 수정과 생성 여부 판단
        QuestionList.objects.filter(title_address=request.POST["title_address"]).update(question_text = request.POST["question_text"], first_link = request.POST["first_link"], second_link = request.POST["second_link"], third_link = request.POST["third_link"], fourth_link = request.POST["fourth_link"])
        return HttpResponse("succes")
    else:
        QuestionList.objects.create(title_address = request.POST["title_address"], question_text = request.POST["question_text"], first_link = request.POST["first_link"], second_link = request.POST["second_link"], third_link = request.POST["third_link"], fourth_link = request.POST["fourth_link"])
        return HttpResponse("succes")

def question_delete(reqest):
    questionItem = QuestionList.objects.get(title_address = reqest.POST["title_address"])
    questionItem.delete()
    return HttpResponse("succes")

def in_region(request): #어떤 지역 클릭해서 들어왔을때 
    user_key = request.GET['user_key']
    GptOb.append_user(user_key) #새로운 유저리스트 추가 - GptOb 클래스 사용으로 유저 & 지역마다 gpt 대화 리스트 갖고있도록 함.
    region = request.GET['user_key'].split("_")[1]
    q_result = QuestionList.objects.get(title_address=f"{region}_지역에 대해 소개해줘")
    GptOb.append_user_q(user_key, q_result.title_address.split("_")[0] + q_result.title_address.split("_")[1])
    GptOb.append_assistant_a(user_key, q_result.question_text)
    print(GptOb.getter_userlist(user_key))
    return HttpResponse(q_result.question_text)

def in_region2(request): #------------------------
    user_key = request.GET['user_key']
    GptOb.append_user(user_key) #새로운 유저리스트 추가 - GptOb 클래스 사용으로 유저 & 지역마다 gpt 대화 리스트 갖고있도록 함.
    region = request.GET['user_key'].split("_")[1]
    q_result = QuestionList.objects.get(title_address=f"{region}_지역에 대해 소개해줘") #유저키_지역 에서 지역을 가져와 기본 글이 될 지역소개를 DB에서 획득
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
    q_result = QuestionList.objects.get(title_address = user_key.split('_')[1] + "_" + title_address) #요청받은 지역과 질문에 해당하는 DB 데이터 추출 
    response_ob = {"answer_list": [], "category" : "q_list_data"}
    title_keyword = title_address[3:].split(" ")[0] #요청받은 데이터에서 질문 키워드 추출
    response_ob["answer_list"].append({"keyword" : title_keyword, "question_text" : q_result.question_text, "first_link" : q_result.first_link, "second_link" : q_result.second_link, "third_link" : q_result.third_link, "fourth_link" : q_result.fourth_link})
    return JsonResponse(response_ob)

def answer_gpt(request): #사용자가 질문창으로 질문함
    selected_region = request.GET['user_key'].split("_")[1]
    keyword_list = ["숙소", "맛집", "관광지"] #----미리준비된 DB데이터의 질문컬럼 키워드
    denial_list = ["외", "다른", "말고", "그밖에", "아니", "아닌", *food_list.food_list] #예외 단어 리스트로 DB데이터과 GPT데이터 응답으로 구분
    denial_chek = False #예외 단어 포함여부
    for keyword in [*keyword_list]:
        if keyword not in request.GET["title_address"]:
            keyword_list.remove(keyword)
    #DB데이터 키워드 한개라도 포함하면 그때 예외 단어 포함 여부 검사
    if len(keyword_list) != 0:
        for denial in denial_list:
            if denial in request.GET["title_address"]:
                denial_chek = True
                break

    if len(keyword_list) != 0 and denial_chek == False: #질문리스트 키워드 한개라도 포함, 예외단어 포함하지않을때만 DB에서 해당 키워드 관련 데이터 가져와서 json으로 전송
        json_ob = {"answer_list": [], "category" : "q_list_data"} #category키로 데이터 유형 지정해서(DB데이터 / GPT데이터) Front-end단에 응답보내기
        for keyword in keyword_list:
            q_result_list = QuestionList.objects.filter(title_address__contains=keyword) & \
            QuestionList.objects.filter(title_address__contains=selected_region)
            for q_result in q_result_list:
                json_ob["answer_list"].append({"keyword" : keyword,  #질문리스트DB 질문컬럼 키워드
                                               "question_text" : q_result.question_text, #질문리스트DB의 답변 데이터
                                               "first_link" : q_result.first_link, #질문리스트DB의 현재 지역과 키워드에 해당하는 관련 링크들
                                               "second_link" : q_result.second_link, 
                                               "third_link" : q_result.third_link, 
                                               "fourth_link" : q_result.fourth_link
                                                })
        print(json_ob)
        return JsonResponse(json_ob)

    
    def gpt_api_request(messages,user_key): #GPT 요청 함수
        completion = openai.ChatCompletion.create(
            model = "ft:gpt-3.5-turbo-0613:osaka::8IhfBxkx", #준비한 데이터셋으로 파인튜닝한 모델 사용
            messages = messages,
            temperature = 0.2, #텍스트의 다양성 조절
            top_p = 0.5 # 텍스트 생성의 토큰 선택 폭 조절
        )
        
        assistant_content = completion.choices[0].message["content"].strip()
        GptOb.append_assistant_a(user_key, assistant_content) #GptOb 클래스를 사용해 gpt응답 content값을 static 속성인 유저 리스트 안에 현재 유저의 키값으로 대화 추가
        if assistant_content[len(assistant_content)-1] not in [".", "?", "!"]: #답변끊김현상확인
            break_num = assistant_content.split("\n\n")[len(assistant_content.split("\n\n"))-1][0] #답변끊긴 항목번호 리턴
            return break_num
        return assistant_content


    GptOb.append_user_q(request.GET['user_key'], f"{selected_region}에여행갈것이다.{request.GET['title_address'].replace(' ', '')}")
    messages = GptOb.getter_userlist(request.GET['user_key'])
    assistant_content = ""
    try:
        assistant_content = gpt_api_request(messages, request.GET["user_key"])
        if len(assistant_content) == 1:#끊긴 항목번호로 받았을 경우
            print("끊김현상해결시작")
            last_assistant_content = GptOb.get_last_a(request.GET["user_key"])["content"] #해당유저의 질문&응답 리스트에서 마지막 GPT답변 가져오기
            last_list = last_assistant_content.split("\n\n")
            del last_list[len(last_list)-1] #끊긴 항목번호 삭제
            prev_assistant_content = "\n\n".join(last_list) + "\n\n" #끊긴 항목번호 바로 전 항목답변까지 문자열로 합치기
            GptOb.append_user_q(request.GET['user_key'], f"{assistant_content}번항목계속말해줘") #GPT에게 continue 요청
            messages = GptOb.getter_userlist(request.GET['user_key'])
            next_assistant_content = gpt_api_request(messages, request.GET["user_key"])
            next_list = next_assistant_content.split("\n\n")
            del  next_list[0] #직전 항목에 이어서 답변한 응답에 첫 설명부분 자르기
            next_result_content = "\n\n".join(next_list) #이어 답변한
            print(prev_assistant_content + next_result_content)
            assistant_content = prev_assistant_content + next_result_content
    except openai.error.InvalidRequestError: #max_tokens 방지
        print("max_tokens방지 시작")
        GptOb.max_max_tokens_prevention(request.GET["user_key"]) #해당 지역 유저키의 질문응답리스트에서 오래된 데이터 삭제 후 재요청하여 max_tokens방지
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
        print(GptOb.getter_userlist(request.GET['user_key']))
    json_ob = {"answer_list": [], "category" : "gpt_data"} #category키로 데이터 유형 지정해서 Front-end단에 응답보내기
    json_ob["answer_list"].append({"question_text" : assistant_content})
    return JsonResponse(json_ob)


def del_user(request):
    user_key = request.GET['user_key'] #_지역 없는 그냥 유저 랜덤 키값으로 받음
    GptOb.del_user(user_key)
    return HttpResponse("sucess")
'''