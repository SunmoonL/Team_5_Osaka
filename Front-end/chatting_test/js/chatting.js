(() => {
    const submitChat = (userChat) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                console.log(xhttp.responseText);
            }
        };
        xhttp.open("GET", `http://kkms4001.iptime.org:10093/answer_gpt?user_key=${encodeURIComponent("aaa1_오사카만")}&title_address=${encodeURIComponent(userChat)}`, true);
        xhttp.send();
    };
    const startChat = () => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                console.log(xhttp.responseText);
            }
        };
        xhttp.open("GET", `http://kkms4001.iptime.org:10093/in_region?user_key=${encodeURIComponent("aaa1_오사카만")}`, true);
        xhttp.send();
    };
    window.addEventListener('beforeunload', () => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                console.log(xhttp.responseText);
            }
        };
        
        xhttp.open("GET", `http://kkms4001.iptime.org:10093/del_user?user_key=${encodeURIComponent("aaa1")}`, true);
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
        const userChat = document.getElementById("chatInput").value;
        document.getElementById("chatWrapBox").innerHTML += `<div class="userChat">${userChat}</div>`;
        submitChat(userChat);
    });
})();