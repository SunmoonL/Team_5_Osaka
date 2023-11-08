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
  
  const [regionalName, setRegional] = useState("main"); // 현재 위치
  const [userKey] = useState(`user${new Date().getTime()}${Math.floor(Math.random() * 9999)}`); // 사용자 중복방지
  const [imgContent, addContent] = useState({food : false, hotel : false, location : false}); // 요소 이미지 확인
  const [storeName, setStoreName] = useState({}) //가게이름
  const location = useLocation(); // 라우터 정보 가져오기

  if (location.pathname !== "/" && regionalName === "main") { // 상태에 맞는 위치에서 벗어날 경우 메인 페이지로 이동
    window.location.replace("/");
  }

  useEffect(() => {
    window.addEventListener('beforeunload', (e) => { // 유저키를 서버로 보내서 대화내용 중복 방지
      const xhttp = new XMLHttpRequest();
      xhttp.open("GET", `http://kkms4001.iptime.org:10093/del_user?user_key=${encodeURIComponent(userKey)}`, true);
      xhttp.send();
    });
  }, []);

  return (
    <div className="App">
      <Background regional={[regionalName]}></Background>
      <ContentsWrap>
        <Routes>
          <Route path='/' element={
            <>
            <div className="contentBox">
              <TitleText regional={[regionalName, setRegional]}/>
              <RegionalList regional={[regionalName, setRegional]}/>
            </div>
            </>
          }></Route>
          <Route path='/detail_page' element={
            <>
              <Logo/>
              <div className="contentBox">
                <Explanation storeName={storeName} regional={regionalName} imgContent={imgContent} ></Explanation>
                <Chatting setStore={[storeName, setStoreName]} setContent={[imgContent, addContent]} regional={regionalName} userKey={userKey}/>
              </div>
            </>
          }></Route>
        </Routes>
      </ContentsWrap>

          
    </div>
  );
}

export default App;
