(() => {
    const createRow = () => {
        const xhttp = new XMLHttpRequest();
        const title = document.getElementById("title");
        const address = document.getElementById("address");
        const questionText = document.getElementsByClassName("questionText")[0];

        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
            }
        };
        xhttp.open("POST", `http://kkms4001.iptime.org:10092//`, true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send();
    }

    const readDB = () => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                console.log(JSON.parse(xhttp.responseText));
            }
        };
        xhttp.open("POST", `http://kkms4001.iptime.org:10093/question_list/`, true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send();
    }
    readDB();

})();