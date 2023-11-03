import './scss/Chatting.scss';
import { useState, useEffect } from 'react';
//import {Link} from "react-router-dom";

const Chatting = () => {
    const chatProfileSrc = `${process.env.PUBLIC_URL}/images/chat_profile.pug`
    useEffect(() => {
        let gptChatDelay = false;
        const userKey = `user${new Date().getTime()}${Math.floor(Math.random() * 9999)}`;

        const chatAlert = () => {
            const thisAlert = document.getElementById("chatAlert");
            if (!thisAlert.classList.contains('displayFlag')) {
                thisAlert.classList.add('displayFlag');
                setTimeout(() => {
                    thisAlert.classList.remove('displayFlag');
                }, 2000);
            }
        }
        const submitChat = (userChat, routString) => {
            if (gptChatDelay) {
                chatAlert();
                return;
            }
            else {
                document.getElementById("helpArticle").classList.remove('displayFlag');
                document.getElementById("chatWrapBox").innerHTML += `<div class="userChat">${userChat}</div>`;
                document.getElementById("chatWrapBox").innerHTML += `
                    <div class="chatProfile">
                        <img class="profileImg" src="${chatProfileSrc}" alt="">
                        <p>AI 챗봇</p>
                    </div><div class="gptChat waitChat"></div>`;
                gptChatDelay = true;
            }

            const xhttp = new XMLHttpRequest();
            const chatUl = document.getElementById("chatArticle");

            chatUl.scrollTop = chatUl.scrollHeight;
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    const targetChat = document.getElementsByClassName("waitChat")[0];
                    const initChat = [...xhttp.responseText];
                    const oneWordInit = () => {
                        const thisChat = initChat.shift();
                        if (initChat.length === 0) {
                            gptChatDelay = false;
                            return;
                        }
                        if (thisChat === "\n") { targetChat.innerHTML += "<br>"; }
                        else { targetChat.innerHTML += thisChat; }
                        chatUl.scrollTop = chatUl.scrollHeight;
                        setTimeout(oneWordInit, Math.random() * 110);
                    };
                    oneWordInit();

                    targetChat.classList.remove("waitChat");
                }
            };
            xhttp.open("GET", `http://kkms4001.iptime.org:10093/${routString}?user_key=${encodeURIComponent(userKey + "_오사카만")}&title_address=${encodeURIComponent(userChat)}`, true);
            xhttp.send();
        };
        const startChat = () => {
            if (gptChatDelay) {
                chatAlert();
                return;
            }
            gptChatDelay = true;
            const xhttp = new XMLHttpRequest();
            const chatUl = document.getElementById("chatArticle");
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    document.getElementById("chatWrapBox").innerHTML += `
                <div class="chatProfile">
                    <img class="profileImg" src="${chatProfileSrc}" alt="">
                    <p>AI 챗봇</p>
                </div>
                <div class="gptChat"></div>`;
                    const initChat = [...xhttp.responseText];
                    const getChat = document.getElementsByClassName("gptChat");
                    const targetChat = getChat[getChat.length - 1];
                    const oneWordInit = () => {
                        const thisChat = initChat.shift();
                        if (initChat.length === 0) {
                            gptChatDelay = false;
                            return;
                        }
                        if (thisChat === "\n") { targetChat.innerHTML += "<br>"; }
                        else { targetChat.innerHTML += thisChat; }
                        chatUl.scrollTop = chatUl.scrollHeight;
                        setTimeout(oneWordInit, Math.random() * 80);
                    };
                    oneWordInit();
                }
            };
            xhttp.open("GET", `http://kkms4001.iptime.org:10093/in_region?user_key=${encodeURIComponent(userKey + "_오사카만")}`, true);
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
        document.getElementById("chatInput").addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const userChat = e.target.value;
                submitChat(userChat, "answer_gpt");
                e.target.value = "";
            }
        });
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
            submitChat(userChat.value, "answer_gpt");
            userChat.value = "";
        });
        [...document.getElementsByClassName("questionList")].forEach(v => {
            v.addEventListener("click", (e) => {
                const userChat = e.target.innerHTML;
                submitChat(userChat, "answer_q_list");
            });
        });
        startChat();
    }, [])
    return (
        <div className="Chatting">
            <section id="chattingBox">
                <p id="chatAlert"> 지금은 전송이 불가능합니다.</p>
                <button id="helpButton">?</button>
                <article id="helpArticle">
                    <div> 자주 묻는 질문</div>
                    <div className="questionList">근처 관광지 추천해줘</div>
                    <div className="questionList">근처 맛집 추천해줘</div>
                    <div className="questionList">근처 숙소 추천해줘</div>
                </article>
                <article id="chatArticle">
                    <div id="chatWrapBox">
                    </div>
                </article>
                <article id="submitArticle">
                    <input id="chatInput" type="text" placeholder="안녕하세요! 질문을 입력해주세요."/>
                        <button id="chatButton">전송</button>
                </article>
            </section>
        </div>
    );
};
export default Chatting;