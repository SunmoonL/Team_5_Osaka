(() => {
    const userKey = `user${new Date().getTime()}${Math.floor(Math.random() * 9999)}`;
    console.log(userKey);
    const submitChat = (userChat) => {
        const xhttp = new XMLHttpRequest();
        document.getElementById("chatWrapBox").innerHTML += `
                <div class="chatProfile">
                    <div class="test"></div>
                    <p>AI 챗봇</p>
                </div><div class="gptChat waitChat"></div>`;
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                console.log(xhttp.responseText);
                const targetChat = document.getElementsByClassName("waitChat")[0];
                targetChat.innerHTML = xhttp.responseText;
                targetChat.classList.remove("waitChat"); 
            }
        };
        xhttp.open("GET", `http://kkms4001.iptime.org:10093/answer_gpt?user_key=${encodeURIComponent(userKey+"_오사카만")}&title_address=${encodeURIComponent(userChat)}`, true);
        xhttp.send();
    };
    const startChat = () => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                document.getElementById("chatWrapBox").innerHTML += `<div class="gptChat">${xhttp.responseText}</div>`;
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
        document.getElementById("chatWrapBox").innerHTML += `<div class="userChat">${userChat.value}</div>`;
        submitChat(userChat.value);
        userChat.value = "";
    });
})();