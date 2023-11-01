(() => {
    const submitChat = () => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                console.log(JSON.parse(xhttp.responseText));
            }
        };
        
        xhttp.open("GET", `http://kkms4001.iptime.org:10093/in_region/?user_key=${"aaa1_오사카만"}`, true);
        xhttp.send();
    };
    const startChat = () => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
            }
        };
        xhttp.open("GET", `http://kkms4001.iptime.org:10093/answer_gpt/`, true);
        xhttp.send();
    };
    window.addEventListener('beforeunload', () => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                console.log(xhttp.responseText);
            }
        };
        
        xhttp.open("GET", `http://kkms4001.iptime.org:10093/del_user/?user_key=${"aaa1_오사카만"}`, true);
        xhttp.send();
    });
    submitChat();
    document.getElementById("helpButton").addEventListener("click", () => {
        const helpArticle = document.getElementById("helpArticle");
        if (helpArticle.classList.contains('displayFlag')) {
            helpArticle.classList.remove('displayFlag');
        } else {
            helpArticle.classList.add('displayFlag');
        };
    });
    document.getElementById("chatButton").addEventListener("click", () => {
        const inputValue = document.getElementById("chatInput").value;
        document.getElementById("chatWrapBox").innerHTML += `<div class="userChat">${inputValue}</div>`;
        
    });
})();