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
  const [BackgroundSrc, setBackground] = useState("main");
  const [prevBackgroundSrc, setPrevBackground] = useState("남바");
  const [detailTitle, setDetailTitle] = useState("");
  const [detailContent, setDetailContent] = useState("");

  return (
    <div className="App">
      <Background BackgroundSrc={BackgroundSrc} prevBackgroundSrc={prevBackgroundSrc}>
        
        <Routes>
          <Route path='/' element={
            <>
            <div className="contentBox">
              <TitleText/>
              <RegionalList setDetailContent={setDetailContent} setDetailTitle={setDetailTitle} changeBackground={[BackgroundSrc, setBackground]} changePrevBackground={setPrevBackground}/>
            </div>
            </>
          }></Route>
          <Route path='/detail_page' element={
            <>
              <Logo/>
              <div className="contentBox">
                <Explanation detailTitle={detailTitle} detailContent={detailContent} ></Explanation>
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
