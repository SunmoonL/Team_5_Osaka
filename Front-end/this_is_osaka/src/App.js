import './App.css';
import Background from './pages/Background';
import Explanation from './pages/Explanation';
import Contents from './pages/Contents';
import Chatting from './pages/Chatting';
import RegionalList from './pages/RegionalList';
import {Route, Routes} from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Background>
        <Explanation></Explanation>
        <Contents>
          <Routes>
            <Route path='/' element={<RegionalList/>}></Route>
            <Route path='/a' element={<Chatting/>}></Route>
          </Routes>
        </Contents>
      </Background>
    </div>
  );
}

export default App;
