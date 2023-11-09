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
    file=open("osaka_all_region2.jsonl", "rb"),
    purpose="fine-tune"
)
'''
print(openai.File.list())

#openai.FineTuningJob.create(training_file="file-qdiBmhZtfbUedXgLHaoIGaOP", model="gpt-3.5-turbo-0613") #이케다
#openai.FineTuningJob.create(training_file="file-NUZXqPIkwRzhuOC2R5Lm0Ffj", model="gpt-3.5-turbo-0613") #도톤보리
#openai.FineTuningJob.create(training_file="file-c7863SSc9abZ5Y712AV3tMVJ", model="gpt-3.5-turbo-0613") #시텐노지 사원
#openai.FineTuningJob.create(training_file="file-U78s81RKUeVO0k2hbtZPvyGc", model="gpt-3.5-turbo-0613") #오사카 모든 지역
#openai.FineTuningJob.create(training_file="file-NLalAVlPHdco5bOBbLoM8i0Q", model="gpt-3.5-turbo-0613") #오사카 모든 지역2
#openai.FineTuningJob.cancel("ftjob-JW49TYja99BMLJGrGY9CJ3xo") #job아이디

