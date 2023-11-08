import openai


openai.api_key = "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"

messages = [{"role": "system", "content": "당신은 오사카 여행 도톤보리 지역 가이드이다."}]
while True:
        user_content = input("user: ")
        messages.append({"role": "user", "content": user_content})
        completion = openai.ChatCompletion.create(
            model = "ft:gpt-3.5-turbo-0613:osaka::8IO3UnwV",
            messages = messages,
            temperature = 0,
            top_p = 0.5,
            stop="5",
            #n=1,
        )
        assistant_content = completion.choices[0].message["content"].strip()
        messages.append({"role": "assistant", "content": assistant_content})
        print(assistant_content)
        print("messages: ", messages)