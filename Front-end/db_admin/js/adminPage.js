(() => {
    const ec = v => encodeURIComponent(v);
    document.getElementsByTagName("html")[0].addEventListener("click", (e) => {
        [...document.getElementsByClassName("qu")].forEach(v => {
            v.classList.remove("displayFlag");
        });
    });
    const readDB = () => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                document.getElementById("dbList").innerHTML = "";
                const resList = JSON.parse(xhttp.responseText).res_list;
                resList.forEach(element => {
                    const {title_address, question_text, first_link, second_link, third_link, fourth_link} = element;
                    let text = question_text.split("\n").join("<br>");
                    document.getElementById("dbList").innerHTML += `
                            <div class="qu">
                                <p>${title_address}</p>
                                <div class="dbQuestionText">
                                    <div id="${title_address}0">${text}</div>
                                    <br>
                                    <br><div>링크1: <a id="${title_address}1" href="${first_link}">${first_link}</a></div>
                                    <br><div>링크2: <a id="${title_address}2" href="${second_link}">${second_link}</a></div>
                                    <br><div>링크3: <a id="${title_address}3" href="${third_link}">${third_link}</a></div>
                                    <br><div>링크4: <a id="${title_address}4" href="${fourth_link}">${fourth_link}</a></div>
                                </div>
                                <div>
                                    <button id="${title_address}" class="updateButton">수정</button>
                                    <button id="${title_address}" class="deleteButton">삭제</button>
                                </div>
                            </div>
                    `;
                });
                [...document.getElementsByClassName("deleteButton")].forEach(v => {
                    v.addEventListener("click", (e) => {
                        deleteDB(e.target.id);
                    });
                });
                [...document.getElementsByClassName("updateButton")].forEach(v => {
                    v.addEventListener("click", (e) => {
                        const text = document.getElementById(`${e.target.id}0`).innerHTML.split("<br>").join("\n");
                        const link1 = document.getElementById(`${e.target.id}1`).innerHTML;
                        const link2 = document.getElementById(`${e.target.id}2`).innerHTML;
                        const link3 = document.getElementById(`${e.target.id}3`).innerHTML;
                        const link4 = document.getElementById(`${e.target.id}4`).innerHTML;
                        const [val1, val2] = e.target.id.split("_");
                        $("#address").val(val1).prop("selected", true);
                        $("#title").val(val2).prop("selected", true);
                        $(".questionText").val(text);
                        $("#first_link").val(link1);
                        $("#second_link").val(link2);
                        $("#third_link").val(link3);
                        $("#fourth_link").val(link4);
                    });
                });
                [...document.getElementsByClassName("qu")].forEach(v => {
                    v.addEventListener("click", (e) => {
                        setTimeout(() => {
                            e.target.classList.add("displayFlag");
                        }, 10);
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
        xhttp.send(`title_address=${ec(title_address)}`);
    };
    const createRow = () => {
        const xhttp = new XMLHttpRequest();
        const title = document.getElementById("title").value;
        const address = document.getElementById("address").value;
        const first_link = document.getElementById("first_link").value;
        const second_link = document.getElementById("second_link").value;
        const third_link = document.getElementById("third_link").value;
        const fourth_link = document.getElementById("fourth_link").value;
        const questionText = document.getElementsByClassName("questionText")[0].value;
        const title_address = `${address}_${title}`;

        [...document.getElementsByTagName("input")].forEach(v => {
            v.value = "";
        });
        [...document.getElementsByTagName("textarea")].forEach(v => {
            v.value = "";
        });
        console.log(title, address, questionText);
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                readDB();
            }
        };
        xhttp.open("POST", `http://kkms4001.iptime.org:10093/question_create/`, true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send(`title_address=${ec(title_address)}&question_text=${ec(questionText)}&first_link=${ec(first_link)}&second_link=${ec(second_link)}&third_link=${ec(third_link)}&fourth_link=${ec(fourth_link)}`);
    }
    document.getElementById("saveButton").addEventListener("click", createRow);
    readDB();

})();