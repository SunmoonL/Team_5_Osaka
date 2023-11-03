(() => {
    const userKey = `user${new Date().getTime()}${Math.floor(Math.random() * 9999)}`;
    console.log(userKey);
    const submitChat = (userChat) => {
        const xhttp = new XMLHttpRequest();
        const chatUl = document.getElementById("chatArticle");
        document.getElementById("chatWrapBox").innerHTML += `<div class="userChat">${userChat}</div>`;
        document.getElementById("chatWrapBox").innerHTML += `
                <div class="chatProfile">
                    <img class="test" src="./css/KakaoTalk_20231102_124943047.png" alt="">
                    <p>AI 챗봇</p>
                </div><div class="gptChat waitChat"></div>`;
        chatUl.scrollTop = chatUl.scrollHeight;
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                const targetChat = document.getElementsByClassName("waitChat")[0];
                const initChat = [...xhttp.responseText];
                const oneWordInit = () => {
                    const thisChat = initChat.shift();
                    if (initChat.length === 0) {return ;}
                    if (thisChat === "\n") { targetChat.innerHTML += "<br>"; }
                    else { targetChat.innerHTML += thisChat; }
                    chatUl.scrollTop = chatUl.scrollHeight;
                    setTimeout(oneWordInit, Math.random() * 110);
                };
                oneWordInit();

                targetChat.classList.remove("waitChat"); 
            }
        };
        xhttp.open("GET", `http://kkms4001.iptime.org:10093/answer_gpt?user_key=${encodeURIComponent(userKey+"_오사카만")}&title_address=${encodeURIComponent(userChat)}`, true);
        xhttp.send();
    };
    document.getElementById("chatInput").addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const userChat = e.target.value;
            submitChat(userChat);
            e.target.value = "";
        }
    });
    const startChat = () => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                document.getElementById("chatWrapBox").innerHTML += `
                <div class="chatProfile">
                    <img class="test" src="./css/KakaoTalk_20231102_124943047.png" alt="">
                    <p>AI 챗봇</p>
                </div>
                <div class="gptChat"></div>`;
                const initChat = [...xhttp.responseText];
                const getChat = document.getElementsByClassName("gptChat");
                const targetChat = getChat[getChat.length - 1];
                const oneWordInit = () => {
                    const thisChat = initChat.shift();
                    if (initChat.length === 0) {return ;}
                    if (thisChat === "\n") { targetChat.innerHTML += "<br>"; }
                    else { targetChat.innerHTML += thisChat; }
                    setTimeout(oneWordInit, Math.random() * 110);
                };
                oneWordInit();
            }
        };
        xhttp.open("GET", `http://kkms4001.iptime.org:10093/in_region?user_key=${encodeURIComponent(userKey+"_오사카만")}`, true);
        xhttp.send();
    };
    window.addEventListener('beforeunload', () => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                console.log(xhttp.responseText);
            }
        };
        
        xhttp.open("GET", `http://kkms4001.iptime.org:10093/del_user?user_key=${encodeURIComponent(userKey)}`, true);
        xhttp.send();
    });
    startChat();
    document.getElementById("helpButton").addEventListener("click", () => {
        const helpArticle = document.getElementById("helpArticle");
        if (helpArticle.classList.contains('displayFlag')) {
            helpArticle.classList.remove('displayFlag');
        } else {
            helpArticle.classList.add('displayFlag');
        };
    });
    document.getElementById("chatButton").addEventListener("click", () => {
        const userChat = document.getElementById("chatInput");
        submitChat(userChat.value);
        userChat.value = "";
    });
})();