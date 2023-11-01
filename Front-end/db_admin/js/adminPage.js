(() => {
    const readDB = () => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                document.getElementById("dbList").innerHTML = "";
                const resList = JSON.parse(xhttp.responseText).res_list;
                resList.forEach(element => {
                    const {title_address, question_text} = element;
                    document.getElementById("dbList").innerHTML += `
                            <div>
                                <p>${title_address}</p>
                                <div class="dbQuestionText">${question_text}</div>
                                <button id="${title_address}" class="deleteButton">삭제</button>
                            </div>
                    `;
                });
                [...document.getElementsByClassName("deleteButton")].forEach(v => {
                    v.addEventListener("click", (e) => {
                        deleteDB(e.target.id);
                    });
                });
            }
        };
        xhttp.open("POST", `http://kkms4001.iptime.org:10093/question_list/`, true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send();
    };
    const deleteDB = (title_address) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                readDB();
            }
        };
        xhttp.open("POST", `http://kkms4001.iptime.org:10093/question_delete/`, true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send(`title_address=${title_address}`);
    };
    const createRow = () => {
        const xhttp = new XMLHttpRequest();
        const title = document.getElementById("title").value;
        const address = document.getElementById("address").value;
        const questionText = document.getElementsByClassName("questionText")[0].value;

        console.log(title, address, questionText);
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                readDB();
            }
        };
        xhttp.open("POST", `http://kkms4001.iptime.org:10093/question_create/`, true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send(`title_address=${address}_${title}&question_text=${questionText}`);
    }
    document.getElementById("saveButton").addEventListener("click", createRow);
    readDB();

})();