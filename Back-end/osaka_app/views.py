from django.shortcuts import render, HttpResponse
from osaka_app.models import QuestionList
from django.http import JsonResponse
import openai
from osaka_app import key
from osaka_app import food_list
from osaka_app import filter_keyword

openai.api_key = key.api_key


class GptOb: #정적 클래스를 사용하여 유저마다 유효한 GPT 질문&대답 리스트를 유지 및 관리
    __user_list = {}
    
    @staticmethod
    def append_user(user_key):
        GptOb.__user_list[user_key] = [{"role": "system", "content": "당신은 오사카 여행 가이드이다."}]

    @staticmethod
    def getter_userlist(user_key):
        return GptOb.__user_list[user_key] #인자로 받은 유저키에 해당하는 GPT질문&대답 리스트 추출
    
    @staticmethod
    def append_assistant_a(user_key, text): #해당 유저키의 질문&대답 리스트에 GPT 대답객체 삽입
        GptOb.__user_list[user_key].append({"role": "assistant", "content": text})

    @staticmethod
    def append_user_q(user_key, text): #해당 유저키의 질문&대답 리스트에 유저 질문객체 삽입
        GptOb.__user_list[user_key].append({"role": "user", "content": text})

    @staticmethod
    def del_user(delete_key): #user_key대표키 (지역빠진걸로 받음)
        for user_key, value in list(GptOb.__user_list.items()):
            if delete_key in user_key:
                del GptOb.__user_list[user_key]

    @staticmethod
    def del_last_q(user_key): #해당 유저 마지막요소 삭제 -(질문 취소할 때 사용)
        del GptOb.__user_list[user_key][len(GptOb.__user_list[user_key]) - 1]

    @staticmethod
    def max_max_tokens_prevention(user_key): #지역관련 주요 데이터를 제외한 오래된 질문&응답 객체 2세트 삭제
        del GptOb.__user_list[user_key][3:7]
    
    @staticmethod
    def get_last_a(user_key): #GPT의 마지막 답변 가져오기 - 답변 끊겼을 때 사용
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
        #요청받은 질문컬럼과 일치하는 데이터가 존재하면 수정
        QuestionList.objects.filter(title_address=request.POST["title_address"]).update(
            question_text = request.POST["question_text"], first_link = request.POST["first_link"], 
            second_link = request.POST["second_link"], third_link = request.POST["third_link"], 
            fourth_link = request.POST["fourth_link"])
        return HttpResponse("succes")
    else:
        #요청받은 질문컬럼과 일치하는 데이터가 없으면 새로 생성
        QuestionList.objects.create(title_address = request.POST["title_address"],
                                     question_text = request.POST["question_text"], 
                                     first_link = request.POST["first_link"], 
                                     second_link = request.POST["second_link"], 
                                     third_link = request.POST["third_link"], 
                                     fourth_link = request.POST["fourth_link"])
        return HttpResponse("succes")


def question_delete(reqest):
    questionItem = QuestionList.objects.get(title_address = reqest.POST["title_address"])
    questionItem.delete()
    return HttpResponse("succes")


def in_region(request):
    user_key = request.GET['user_key']
    GptOb.append_user(user_key) #새로운 유저리스트 추가 - GptOb 클래스를 사용하여 유저키와 지역을 구분해 유효한 gpt 대화 리스트를 갖고있도록 함.
    region = request.GET['user_key'].split("_")[1]
     #유저키_지역 형식으로 지정된 파라미터값을 통해 해당 지역의 기본 글이 될 지역소개를 DB에서 추출
    q_result = QuestionList.objects.get(title_address=f"{region}_지역에 대해 소개해줘")
    return HttpResponse(q_result.question_text)


def answer_q_list(request): #질문리스트 클릭
    title_address = request.GET['title_address']
    user_key = request.GET['user_key']
    q_result = QuestionList.objects.get(title_address = user_key.split('_')[1] + "_" + title_address) #요청받은 지역과 질문에 해당하는 DB 데이터 추출 
    response_ob = {"answer_list": [], "category" : "q_list_data"}
    title_keyword = title_address[3:].split(" ")[0] #요청받은 데이터에서 질문 키워드 추출
    response_ob["answer_list"].append({"keyword" : title_keyword, 
                                       "question_text" : q_result.question_text, 
                                       "first_link" : q_result.first_link, 
                                       "second_link" : q_result.second_link, 
                                       "third_link" : q_result.third_link, 
                                       "fourth_link" : q_result.fourth_link})
    return JsonResponse(response_ob)


def answer_gpt(request): #사용자가 질문창으로 질문함
    selected_region = request.GET['user_key'].split("_")[1]
    keyword_list = ["숙소", "맛집", "관광지"] #미리준비된 DB데이터의 질문컬럼 키워드
    denial_list = ["외", "다른", "말고", "그밖에", "아니", "아닌", *food_list.food_list] #예외 단어 리스트
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
    
    #DB데이터와 GPT데이터 응답구분
    if len(keyword_list) != 0 and denial_chek == False:
        #질문리스트 키워드 한개라도 포함 & 예외단어 포함하지않을때만 DB에서 해당 키워드 관련 데이터셋 가져와서 json으로 전송
        json_ob = {"answer_list": [], "category" : "q_list_data"} #category키로 데이터 유형 지정해서(DB데이터 / GPT데이터) Front-end단에 응답보내기
        for keyword in keyword_list:
            q_result_list = QuestionList.objects.filter(title_address__contains=keyword) & \
            QuestionList.objects.filter(title_address__contains=selected_region)
            for q_result in q_result_list:
                json_ob["answer_list"].append({"keyword" : keyword,  #질문리스트 모델의 질문컬럼 키워드
                                               "question_text" : q_result.question_text, #질문리스트 모델의 답변 데이터
                                               "first_link" : q_result.first_link, #질문리스트 모델의 현재 지역과 키워드에 해당하는 관련 링크들
                                               "second_link" : q_result.second_link, 
                                               "third_link" : q_result.third_link, 
                                               "fourth_link" : q_result.fourth_link
                                                })
        print(json_ob)
        return JsonResponse(json_ob)

    def gpt_api_request(messages,user_key): #GPT API요청 함수
        completion = openai.ChatCompletion.create(
            model = "ft:gpt-3.5-turbo-0613:osaka::8J75TYQo", #준비한 데이터셋으로 파인튜닝한 모델 사용
            messages = messages,
            temperature = 0.2, #텍스트의 다양성 조절
            top_p = 0.5 # 텍스트 생성의 토큰 선택 폭 조절
        )
        
        assistant_content = completion.choices[0].message["content"].strip()
        GptOb.append_assistant_a(user_key, assistant_content) #GptOb 클래스를 사용해 GPT응답객체의 content값을 해당 유저 리스트 안에 대화 추가
        if assistant_content[len(assistant_content)-1] not in [".", "?", "!"]: #답변끊김현상확인
            break_num = assistant_content.split("\n\n")[len(assistant_content.split("\n\n"))-1][0] #답변끊긴 항목번호 리턴
            return break_num
        return assistant_content

    #여기서 유저 질문넣기 전에 검사--해서 변환해서 넣기 공백제거한걸로 검사
    user_question = request.GET['title_address'].replace(' ', '')
    filter_list = filter_keyword.filter_keyword_list
    for filter_ob in filter_list:
        for filter_txt in filter_ob["filtered_str"].split(" "):
            if filter_txt in user_question:
                user_question = user_question.replace(filter_txt, filter_ob["correct_str"])
                break
    GptOb.append_user_q(request.GET['user_key'], f"{selected_region}에여행갈것이다.{user_question}")
    messages = GptOb.getter_userlist(request.GET['user_key'])
    assistant_content = ""
    try:
        assistant_content = gpt_api_request(messages, request.GET["user_key"])
        if len(assistant_content) == 1: #답변이 끊긴 경우, 끊긴 항목의 번호로 반환받음
            print("끊김현상해결시작")
            last_assistant_content = GptOb.get_last_a(request.GET["user_key"])["content"] #해당 유저의 질문&응답 리스트에서 마지막 GPT답변 가져오기
            last_list = last_assistant_content.split("\n\n")
            del last_list[len(last_list)-1] #답변이 끊긴 항목 번호의 텍스트 삭제
            prev_assistant_content = "\n\n".join(last_list) + "\n\n" #답변이 끊긴 항목번호의 바로 전 항목답변까지 문자열로 합치기
            GptOb.append_user_q(request.GET['user_key'], f"{assistant_content}번항목계속말해줘") #GPT에게 continue 요청
            messages = GptOb.getter_userlist(request.GET['user_key'])
            next_assistant_content = gpt_api_request(messages, request.GET["user_key"])
            next_list = next_assistant_content.split("\n\n")
            del  next_list[0] #continue요청후 응답 첫 설명 부분 자르기
            next_result_content = "\n\n".join(next_list) #continue요청의 응답텍스트를 문자열로 합치기
            assistant_content = prev_assistant_content + next_result_content #답변 끊기기 직전 텍스트와 continue요청 텍스트 합치기 

    except openai.error.InvalidRequestError: #max_tokens 에러 예외처리
        print("max_tokens방지 시작")
        GptOb.max_max_tokens_prevention(request.GET["user_key"]) #해당 유저키의 질문응답리스트에서 오래된 데이터 삭제 후 API재요청하여 max_tokens방지
        messages = GptOb.getter_userlist(request.GET["user_key"])
        #GPT API 재요청
        assistant_content = gpt_api_request(messages, request.GET["user_key"])
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


