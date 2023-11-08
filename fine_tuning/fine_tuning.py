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
    file=open("shitennoji.jsonl", "rb"),
    purpose="fine-tune"
)

print(openai.File.list())
'''
#openai.FineTuningJob.create(training_file="file-qdiBmhZtfbUedXgLHaoIGaOP", model="gpt-3.5-turbo-0613") #이케다
#openai.FineTuningJob.create(training_file="file-NUZXqPIkwRzhuOC2R5Lm0Ffj", model="gpt-3.5-turbo-0613") #도톤보리
openai.FineTuningJob.create(training_file="file-c7863SSc9abZ5Y712AV3tMVJ", model="gpt-3.5-turbo-0613") #시텐노지
#openai.FineTuningJob.cancel("ftjob-JW49TYja99BMLJGrGY9CJ3xo") #job아이디

