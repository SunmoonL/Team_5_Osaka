import openai
openai.api_key = "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"
'''
openai.File.create(
    file=open("test.jsonl", "rb"),
    purpose="fine-tune"
)
'''
'''
openai.File.create(
    file=open("osaka_all_region3.jsonl", "rb"),
    purpose="fine-tune"
)

print(openai.File.list())
'''
#openai.FineTuningJob.create(training_file="file-qdiBmhZtfbUedXgLHaoIGaOP", model="gpt-3.5-turbo-0613") #이케다
#openai.FineTuningJob.create(training_file="file-NUZXqPIkwRzhuOC2R5Lm0Ffj", model="gpt-3.5-turbo-0613") #도톤보리
#openai.FineTuningJob.create(training_file="file-c7863SSc9abZ5Y712AV3tMVJ", model="gpt-3.5-turbo-0613") #시텐노지 사원
openai.FineTuningJob.create(training_file="file-T3APZkE1s0yWDhSBiKrmcZCx", model="gpt-3.5-turbo-0613") #다코야끼 라멘추가
#openai.FineTuningJob.cancel("ftjob-JW49TYja99BMLJGrGY9CJ3xo") #job아이디

