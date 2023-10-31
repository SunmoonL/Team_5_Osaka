import './css/RegionalList.css';
// import { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

const RegionalList = () => {
    return (
        <div className="RegionalList">
            지역 리스트
            <button>
                <Link to="/a"> test button</Link>
            </button>
        </div>
    );
};


export default RegionalList;