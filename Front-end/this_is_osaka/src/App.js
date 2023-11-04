import './App.css';
import Background from './pages/Background';
import Explanation from './pages/Explanation';
import Chatting from './pages/Chatting';
import RegionalList from './pages/RegionalList';
import TitleText from './pages/TitleText';
import Logo from './pages/Logo';
import ContentsWrap from './pages/ContentsWrap';
import {Route, Routes, useLocation} from "react-router-dom";
import { useState, useEffect } from 'react';
import './pages/scss/Common.scss'

const App = () => {
  const [BackgroundSrc, setBackground] = useState("main.jpg"); //메인이미지
  const [prevBackgroundSrc, setPrevBackground] = useState("main.jpg"); //첫번째 배경 이미지
  const [imgFolder, setImgFolder] = useState("") //이미지폴더 지정
  const [detailTitle, setDetailTitle] = useState("main"); //상세페이지 제목
  const [detailContent, setDetailContent] = useState(""); //상세페이지 제목과 관련된 내용
  const [userKey] = useState(`user${new Date().getTime()}${Math.floor(Math.random() * 9999)}`); // 사용자 중복방지
  const location = useLocation();
  
  if (location.pathname !== "/" && detailTitle === "main") {
    window.location.replace("/");
  }
  useEffect(() => {
    window.addEventListener('beforeunload', (e) => {
      const xhttp = new XMLHttpRequest();
      xhttp.open("GET", `http://kkms4001.iptime.org:10093/del_user?user_key=${encodeURIComponent(userKey)}`, true);
      xhttp.send();
    });
  }, []);
  return (
    <div className="App">
      <Background BackgroundSrc={BackgroundSrc} prevBackgroundSrc={prevBackgroundSrc}></Background>
      <ContentsWrap>
        <Routes>
          <Route path='/' element={
            <>
            <div className="contentBox">
              <TitleText backgroundSet={[BackgroundSrc, setBackground, setPrevBackground]}/>
              <RegionalList setDetailContent={setDetailContent} setDetailTitle={setDetailTitle}
                            setImgFolder={setImgFolder}
                            changeBackground={[BackgroundSrc, setBackground]} changePrevBackground={setPrevBackground}/>
            </div>
            </>
          }></Route>
          <Route path='/detail_page' element={
            <>
              <Logo/>
              <div className="contentBox">
                <Explanation detailTitle={detailTitle} detailContent={detailContent} imgFolder={imgFolder}></Explanation>
                <Chatting regional={detailTitle} userKey={userKey}/>
              </div>
            </>
          }></Route>
        </Routes>
      </ContentsWrap>

          
    </div>
  );
}

export default App;
