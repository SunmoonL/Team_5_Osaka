import './App.css';
import Background from './pages/Background';
import Explanation from './pages/Explanation';
import Chatting from './pages/Chatting';
import RegionalList from './pages/RegionalList';
import TitleText from './pages/TitleText';
import {Route, Routes} from "react-router-dom";
import { useState, useEffect } from 'react';

const App = () => {
  const [BackgroundSrc, setBackground] = useState("main");
  const [prevBackgroundSrc, setPrevBackground] = useState("남바");

  return (
    <div className="App">
      <Background BackgroundSrc={BackgroundSrc} prevBackgroundSrc={prevBackgroundSrc}>
        <Routes>
          <Route path='/' element={
            <>
              <TitleText/>
              <RegionalList changeBackground={[BackgroundSrc, setBackground]} changePrevBackground={setPrevBackground}/>
            </>
          }></Route>
          <Route path='/detail_page' element={
            <>
              <Explanation></Explanation>
              <Chatting />
            </>
          }></Route>
        </Routes>
      </Background>
    </div>
  );
}

export default App;
