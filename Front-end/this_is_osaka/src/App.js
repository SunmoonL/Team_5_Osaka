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
  const [testRegional, setRegional] = useState("main");
  const [userKey] = useState(`user${new Date().getTime()}${Math.floor(Math.random() * 9999)}`); // 사용자 중복방지
  const [imgContent, addContent] = useState({food : null, hotel : null, location : null});

  const location = useLocation();
  if (location.pathname !== "/" && testRegional === "main") {
    window.location.replace("/");
  }
  useEffect(() => {
    if (location.pathname === "/" && testRegional !== "main") {
      setRegional("main");
    }
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', (e) => {
      const xhttp = new XMLHttpRequest();
      xhttp.open("GET", `http://kkms4001.iptime.org:10093/del_user?user_key=${encodeURIComponent(userKey)}`, true);
      xhttp.send();
    });
  }, []);
  return (
    <div className="App">
      <Background regional={[testRegional]}></Background>
      <ContentsWrap>
        <Routes>
          <Route path='/' element={
            <>
            <div className="contentBox">
              <TitleText regional={[testRegional, setRegional]}/>
              <RegionalList regional={[testRegional, setRegional]}/>
            </div>
            </>
          }></Route>
          <Route path='/detail_page' element={
            <>
              <Logo/>
              <div className="contentBox">
                <Explanation regional={testRegional} ></Explanation>
                <Chatting setContent={[imgContent, addContent]} regional={testRegional} userKey={userKey}/>
              </div>
            </>
          }></Route>
        </Routes>
      </ContentsWrap>

          
    </div>
  );
}

export default App;
