import './App.css';
import Background from './pages/Background';
import Explanation from './pages/Explanation';
import Chatting from './pages/Chatting';
import RegionalList from './pages/RegionalList';
import TitleText from './pages/TitleText';
import {Route, Routes} from "react-router-dom";
import { useState, useEffect } from 'react';

const App = () => {
  const [BackgroundSrc, setBackground] = useState("");

  return (
    <div className="App">
      <Background BackgroundSrc={BackgroundSrc}>
        <Routes>
          <Route path='/' element={
            <>
              <TitleText/>
              <RegionalList />
            </>
          }></Route>
          <Route path='/a' element={
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
