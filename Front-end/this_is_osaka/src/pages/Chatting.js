import './css/Chatting.css';
// import { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

const Chatting = () => {
    return (
        <div className="Chatting">
            채팅
            <button>
                <Link to="/"> test button</Link>
            </button>
        </div>
    );
};


export default Chatting;