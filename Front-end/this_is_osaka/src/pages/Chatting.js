import './scss/Chatting.scss';
import { useState, useEffect } from 'react';
//import {Link} from "react-router-dom";
<<<<<<< HEAD
const Chatting = ({userKey, regional, setContent}) => {
=======

const Chatting = ({userKey, regional}) => {
>>>>>>> 2aa5ff05 (js,css)
    const [helpArticleDisplay, sethelpArticle] = useState("");
    const [nowChat, setChat] = useState("");
    const [gptChatDelay, setDelay] = useState(false);
    const [chatList, addChat] = useState([]);
    const chatProfileSrc = `${process.env.PUBLIC_URL}/images/chat_profile.png`;
    const chatAlert = () => {
        const thisAlert = document.getElementById("chatAlert");
        if (!thisAlert.classList.contains('displayFlag')) {
            thisAlert.classList.add('displayFlag');
            setTimeout(() => {
                thisAlert.classList.remove('displayFlag');
            }, 2000);
        }
    };
    const slowChat = (initChat, chatUl, targetChat) => {
        const oneWordInit = () => {
            const thisChat = initChat.shift();
            if (initChat.length === 0) {
                setDelay(false);
                return;
            }
            if (thisChat === "\n") { targetChat.innerHTML += "<br>"; }
            else { targetChat.innerHTML += thisChat; }
            chatUl.scrollTop = chatUl.scrollHeight;
            setTimeout(oneWordInit, Math.random() * 70);
        };
        oneWordInit();
    };
    const submitChat = (userChat, routString) => {
        if (gptChatDelay) {
            chatAlert();
            return;
        }
        else {
            addChat([...chatList, 
                <div key={chatList.length}>
                    <div className="userChat">{userChat}</div>
                    <div className="chatProfile">
                        <img className="profileImg" src={`${chatProfileSrc}`} />
                        <p>AI 챗봇</p>
                    </div>
                    <div className="gptChat waitChat"></div>`
                </div>
            ]);
            sethelpArticle('');
            setDelay(true);
        }

        const xhttp = new XMLHttpRequest();
        const chatUl = document.getElementById("chatArticle");

        chatUl.scrollTop = chatUl.scrollHeight;
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                const targetChat = document.getElementsByClassName("waitChat")[0];
                const category = JSON.parse(xhttp.responseText)["category"];
                let saveChat = [];
                let answerListIndex = 0;

                if (category === "q_list_data" ) {
                    const answerList = JSON.parse(xhttp.responseText)["answer_list"];
                    while (answerListIndex < answerList.length) {
                        console.log(answerList[answerListIndex]);
                        const initChat = answerList[answerListIndex]["question_text"];
                        if (answerListIndex !== 0) { saveChat = ["\n", "\n", ...saveChat]; }
                        saveChat = [ ...initChat, ...saveChat];
                        answerListIndex++;
                    }
                } else {
                    const answerList = JSON.parse(xhttp.responseText)["answer_list"];
                    const initChat = answerList[answerListIndex]["question_text"];
                    saveChat = [ ...initChat, ...saveChat];
                }
                slowChat([...saveChat], chatUl, targetChat);
                targetChat.classList.remove("waitChat");
            }
        };
        xhttp.open("GET", `http://kkms4001.iptime.org:10093/${routString}?user_key=${encodeURIComponent(userKey +"_"+regional)}&title_address=${encodeURIComponent(userChat)}`, true);
        xhttp.send();
    };
    const startChat = () => {
        if (gptChatDelay) {
            chatAlert();
            return;
        }
        addChat([...chatList, 
            <div key={chatList.length}>
                <div className="chatProfile">
                    <img className="profileImg" src={`${chatProfileSrc}`} />
                    <p>AI 챗봇</p>
                </div>
                <div className="gptChat"></div>
            </div>
        ]);
        setDelay(true);
        const xhttp = new XMLHttpRequest();
        const chatUl = document.getElementById("chatArticle");
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                const initChat = [...xhttp.responseText];
                const getChat = document.getElementsByClassName("gptChat");
                const targetChat = getChat[getChat.length - 1];
                slowChat(initChat, chatUl, targetChat);
            }
        };
        xhttp.open("GET", `http://kkms4001.iptime.org:10093/in_region?user_key=${encodeURIComponent(userKey +"_"+regional)}`, true);
        xhttp.send();
    };

    const chatInputEvent = (e) => setChat(e.target.value);
    const chatInputSbmitEvent = (e) => {
        if (e.key === "Enter") {
            submitChat(nowChat, "answer_gpt");
            setChat("");
        }
    };
    const chatButtonEvent = () => {
        submitChat(nowChat, "answer_gpt");
        setChat("");
    };
    const helpButtonEvent = () => {
        if (helpArticleDisplay === "") { sethelpArticle('displayFlag'); }
        else { sethelpArticle(''); }
    };
    const questionListEvent = (e) => {
        const userChat = e.target.innerHTML;
        submitChat(userChat, "answer_q_list");
    };
    useEffect(() => {
        startChat();
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