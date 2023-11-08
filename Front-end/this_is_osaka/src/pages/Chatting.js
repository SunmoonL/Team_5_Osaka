import './scss/Chatting.scss';
import { useState, useEffect } from 'react';

const Chatting = ({userKey, regional, setContent, setStore}) => {
    const [storeName, setStoreName] = setStore;             // 맛집, 관광지, 숙소등의 이름과 구글지도 링크들의 state
    const [imgContent, addContent] = setContent;            // 맛집, 관광지, 숙소등의 내용을 보여줄지 말지 결정하는 state
    const [helpArticleDisplay, sethelpArticle] = useState(""); // 도움말창의 on/off 상태를 관리할 state
    const [nowChat, setChat] = useState("");                // 현재 유저가 입력한 채팅 내용을 잠시 저장하는 state
    const [gptChatDelay, setDelay] = useState(false);       // gpt가 답변준비, 답변중인지를 관리하는 state
    const [chatList, addChat] = useState([]);               // 이 지역내의 gpt와 유저의 채팅 내용을 저장, 관리하는 state
    const chatProfileSrc = `${process.env.PUBLIC_URL}/images/chat_profile.png`; // gpt의 프로필 사진링크
    const nowRegional = {     // 현재 위치한 지역의 한글명을 저장하는 변수
        "osaka_port": "오사카만",
        "dotonbori" : "도톤보리",
        "nanba": "난바",
        "shitennogi": "시텐노지 사원",
        "osaka_north": "오사카시 북부",
        "osaka_castle": "오사카성",
        "sakai&kisiwada":"사카이 & 기시와다",
        "ikeda": "이케다"
    }[regional];
    const chatAlert = () => { // gpt가 답변준비, 답변중일때 경고창을 보여주는 함수
        const thisAlert = document.getElementById("chatAlert");
        if (!thisAlert.classList.contains('displayFlag')) {
            thisAlert.classList.add('displayFlag');
            setTimeout(() => {
                thisAlert.classList.remove('displayFlag');
            }, 2000);
        }
    };
    const contentInit = (thisIndex, contentIndex, saveContent, targetChat, initChat, jumpCount) => { // 모바일에서 채팅안에 요소를 넣기위한 함수
        const contentList = {
            "관광지": "location",
            "맛집": "food",
            "숙소": "hotel"
        }[saveContent[contentIndex][thisIndex][saveContent[contentIndex][thisIndex].length - 1]];
        const thisLink = saveContent[contentIndex][thisIndex].shift();
        targetChat.innerHTML += `
                    <div class="m_imgBox">
                        <a href="${thisLink}" target="_blank">
                            <img class="explanImg" src="${process.env.PUBLIC_URL}/images/${regional}/${contentList}/${5 - saveContent[contentIndex][thisIndex].length}.jpg" />
                            <img class="mapGo" src="${process.env.PUBLIC_URL}/images/map.png" alt="지도 바로가기" >
                        </a>
                    </div>
                    `;
        if (saveContent[contentIndex][thisIndex].length === 1) {
            jumpCount++;
            contentIndex++;
        }
        targetChat.innerHTML += `<div class="spaceBar"></div>`;
        initChat.shift();
        return [contentIndex, jumpCount];
    };
    const slowChat = (initChat, chatUl, targetChat, saveContent) => { // gpt의 채팅이 하나씩 나오도록하고 contentInit 함수를 실행 시키기위한 함수
        let thisIndex = 0;
        let contentIndex = 0;
        let jumpCount = 0;
        const oneWordInit = () => {             // gpt의 채팅이 한글자씩 나올 수 있도록하는 재귀함수
            const thisChat = initChat.shift();  // 현재 채팅의 제일 앞 글자를 가져온 변수
            
            if (thisChat === "\n") { targetChat.innerHTML += "<br>"; }  // 개행문자를 br 태그로 바꿔서 넣어주는 조건
            else { targetChat.innerHTML += thisChat; }                  // 개행문자가 아닌 경우 한글자를 넣어주는 조건

            if (saveContent.length > 0 && thisChat === "\n" && initChat[0] === "\n") { // 채팅창내에 content를 넣을지 확인하는 조건
                if (jumpCount > 0) { 
                    jumpCount--; 
                } else {
                    [contentIndex, jumpCount] = contentInit(thisIndex, contentIndex, saveContent, targetChat, initChat, jumpCount);
                }
            }
            chatUl.scrollTop = chatUl.scrollHeight;             // 채팅창이 항상 밑에있게 해주는 코드
            if (initChat.length !== 0) {
                setTimeout(oneWordInit, Math.random() * 70);    // 0.ms ~ 70ms 사이의 랜덤한 시간마다 재귀를 시켜주는 코드
            } else {
                setDelay(false); // 채팅이 다 보내졌을때 딜레이를 제거하고 함수를 탈출하는 코드
            }
        };
        oneWordInit(); // 재귀함수 실행
    };
    const submitChat = (userChat, routString) => {  // 유저가 채팅을 전송할때 실행되는 함수
        if (gptChatDelay) {                         // gpt가 채팅준비, 채팅중일때 경고창을 실행하는 코드
            chatAlert();
            return;
        } else if (userChat.trim() === "") {        // 유저가 whitespace로만 이루어진 채팅을 썼을때 함수를 종료하는 조건
            return;
        } else {
            addChat([...chatList,                           // 새로 들어온 유저 채팅을 추가하고 답변을 할 gpt 채팅을 추가하는 코드
                <div key={chatList.length}>
                    <div className="userChat">{userChat}</div>
                    <div className="chatProfile">
                        <img className="profileImg" src={`${chatProfileSrc}`} alt="오사카 챗봇"/>
                        <p>오사카 챗봇</p>
                    </div>
                    <div className="gptChat waitChat"></div>
                </div>
            ]);
            sethelpArticle(''); // 만약 도움말이 켜져있다면 닫게 해주는 코드
            setDelay(true);     // gpt의 채팅이 준비중이라는 걸 알려주는 코드
        }

        const xhttp = new XMLHttpRequest();
        const chatUl = document.getElementById("chatArticle");

        chatUl.scrollTop = chatUl.scrollHeight;
        xhttp.onreadystatechange = () => {                          // 비동기로 값이 오면 실행되는 함수
            if (xhttp.readyState === 4 && xhttp.status === 200) {   // 비동기의 통신 결과가 정상적인지 확인하는 조건
                const targetChat = document.getElementsByClassName("waitChat")[0];  // 마지막에 추가한 gpt의 DOM 객체
                const category = JSON.parse(xhttp.responseText)["category"];        // 비동기로 받은 채팅의 종류
                let saveChat = [];          // 비동기로 받은 채팅을 저장하는 임시 배열
                let saveContent = [];       // 비동기로 받은 content를 저장하는 임시 배열
                let saveImg = {};           // 비동기로 받은 content의 공개 여부를 저장하는 임시 배열
                let saveStore = {};         // 비동기로 받은 가게의 이름과 위치 정보를 저장하는 임시배열
                let answerListIndex = 0;    // 비동기로 받은 리스트의 인덱스

                if (category === "q_list_data" ) {  // DB에 저장된 답변으로 들어올때 실행되는 구문
                    const answerList = JSON.parse(xhttp.responseText)["answer_list"];
                    while (answerListIndex < answerList.length) {
                        const initContent = [[answerList[answerListIndex]["first_link"], answerList[answerListIndex]["second_link"], answerList[answerListIndex]["third_link"], answerList[answerListIndex]["fourth_link"], answerList[answerListIndex]["keyword"]]];
                        const initChat = answerList[answerListIndex]["question_text"];
                        const initStore = initChat.split(/[1-4]. /).filter((v, i) => i !== 0 && v.indexOf(":") !== -1).map(v => v.split(":")[0]);
                        
                        saveStore = {...saveStore, [{"관광지" : "location", "맛집" : "food", "숙소" : "hotel" }[initContent[0][4]]]:initStore.map((v, i) => {
                            return [`#${v}`, initContent[0][i]];
                        })};
                        saveImg = {...saveImg, [{ "관광지" : "location", "맛집" : "food", "숙소" : "hotel"}[initContent[0][4]]] :true};
                        if (answerListIndex !== 0) { saveChat = ["\n", "\n", ...saveChat]; }
                        saveChat = [ ...initChat, ...saveChat];
                        saveContent = [initContent, ...saveContent];
                        answerListIndex++;
                    }
                    setStoreName({...storeName, ...saveStore});
                    addContent({...imgContent, ...saveImg});
                } else {    // gpt의 프리스타일 답변이 들어오면 실행되는 구문
                    const answerList = JSON.parse(xhttp.responseText)["answer_list"];
                    const initChat = answerList[answerListIndex]["question_text"];
                    saveChat = [ ...initChat, ...saveChat];
                }
                slowChat([...saveChat], chatUl, targetChat, saveContent); // 한글자씩 실행되는 함수 호출
                targetChat.classList.remove("waitChat");
            }
        };
        xhttp.open("GET", `http://kkms4001.iptime.org:10093/${routString}?user_key=${encodeURIComponent(userKey +"_"+nowRegional)}&title_address=${encodeURIComponent(userChat)}`, true);
        xhttp.send();
    };
    const startChat = () => { // 처음 지역에 들어왔을때 실행되는 gpt 채팅함수
        if (gptChatDelay) {   // gpt가 채팅준비, 채팅중일때 경고창을 실행하는 코드
            chatAlert();
            return;
        }
        addChat([...chatList, // gpt의 채팅을 추가하는 코드
            <div key={chatList.length}>
                <div className="chatProfile">
                    <img className="profileImg" src={`${chatProfileSrc}`} alt="오사카 챗봇"/>
                    <p>오사카 챗봇</p>
                </div>
                <div className="gptChat"></div>
            </div>
        ]);
        setDelay(true);      // gpt의 채팅이 시작했다는 걸 알리는 코드
        const xhttp = new XMLHttpRequest();
        const chatUl = document.getElementById("chatArticle");  // 채팅이 입력될때 항상 하단에 채팅창을 고정시킬 DOM 객체
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                const initChat = [...xhttp.responseText];                       // 비동기로 들어온 gpt의 채팅
                const gptChat = document.getElementsByClassName("gptChat")[0];  // gpt의 채팅이 들어갈 DOM 객체
                slowChat(initChat, chatUl, gptChat, []);
            }
        };
        xhttp.open("GET", `http://kkms4001.iptime.org:10093/in_region?user_key=${encodeURIComponent(userKey +"_"+nowRegional)}`, true);
        xhttp.send();
    };

    const chatInputEvent = (e) => setChat(e.target.value); // 유저가 채팅창에 글자를 입력할때마다 state 변경
    const chatInputSbmitEvent = (e) => {        // 채팅입력 도중 엔터키를 누르면 전송
        if (e.key === "Enter") {
            submitChat(nowChat, "answer_gpt");
            setChat("");
        }
    };
    const chatButtonEvent = () => {             // 채팅입력 도중 전송버튼을 누르면 전송
        submitChat(nowChat, "answer_gpt");
        setChat("");
    };
    const helpButtonEvent = () => {             // 도움말 페이지를 토글 형식으로현
        if (helpArticleDisplay === "") { sethelpArticle('displayFlag'); }
        else { sethelpArticle(''); }
    };
    const questionListEvent = (e) => {          // 도움말을 클릭하면 해당 내용을 보내는 함수
        const userChat = e.target.innerHTML;
        submitChat(userChat, "answer_q_list");
    };
    useEffect(() => {                           // 지역에 들어왔을때 단 한번 첫번째로 실행되는 구문
        startChat();
    }, []);
    useEffect(() => {                           // content 초기화
        addContent({food : false, hotel : false, location : false});
    }, []);

    return (
        <div className="Chatting">
            <section id="chattingBox">
                <p id="chatAlert"> 지금은 전송이 불가능합니다.</p>
                <button id="helpButton" onClick={() => helpButtonEvent()}>?</button>
                <article id="helpArticle" className={helpArticleDisplay}>
                    <div> 자주 묻는 질문</div>
                    <div className="questionList" onClick={e => questionListEvent(e)}>근처 관광지 추천해줘</div>
                    <div className="questionList" onClick={e => questionListEvent(e)}>근처 맛집 추천해줘</div>
                    <div className="questionList" onClick={e => questionListEvent(e)}>근처 숙소 추천해줘</div>
                </article>
                <article id="chatArticle">
                    <div id="chatWrapBox">
                        {chatList}
                    </div>
                </article>
                <article id="submitArticle">
                    <input id="chatInput" value={nowChat} onKeyDown={ e => chatInputSbmitEvent(e)} onChange = {(e) => chatInputEvent(e)} type="text" placeholder="안녕하세요! 질문을 입력해주세요." />
                    <button id="chatButton" onClick={() => chatButtonEvent()}>전송</button>
                </article>
            </section>
        </div>
    );
};
export default Chatting;