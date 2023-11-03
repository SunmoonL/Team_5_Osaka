import './App.css';
import Background from './pages/Background';
import Explanation from './pages/Explanation';
import Chatting from './pages/Chatting';
import RegionalList from './pages/RegionalList';
import TitleText from './pages/TitleText';
import Logo from './pages/Logo';
import {Route, Routes} from "react-router-dom";
import { useState, useEffect } from 'react';
import './pages/scss/Common.scss'

const App = () => {
  const [BackgroundSrc, setBackground] = useState("osaka_castle.jpg"); //메인이미지
  const [prevBackgroundSrc, setPrevBackground] = useState("osaka_castle.jpg"); //첫번째 배경 이미지
  const [imgFolder, setImgFolder] = useState("") //이미지폴더 지정
  const [detailTitle, setDetailTitle] = useState("main"); //상세페이지 제목
  const [detailContent, setDetailContent] = useState(""); //상세피이지 제목과 관련된 내용
  return (
    <div className="App">
      <Background BackgroundSrc={BackgroundSrc} prevBackgroundSrc={prevBackgroundSrc}>
        
        <Routes>
          <Route path='/' element={
            <>
            <div className="contentBox">
              <TitleText/>
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
                <Chatting />
              </div>
            </>
          }></Route>
        </Routes>
          
      </Background>
    </div>
  );
}

export default App;
