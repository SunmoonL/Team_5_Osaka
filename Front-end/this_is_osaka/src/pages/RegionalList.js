import './scss/RegionalList.scss';
// import { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import { useState, useEffect } from 'react';
import Explanation from './Explanation';

const RegionalList = ( {regional} ) => {
    const regionaArray = [
        {title: "오사카만", regional: "osaka_port"},
        {title: "도톤보리", regional: "dotonbori"},
        {title: "난바", regional: "nanba"},
        {title: "시텐노지 사원", regional: "shitennogi"},
        {title: "오사카시 북부", regional: "osaka_north"},
        {title: "오사카성", regional: "osaka_castle"},
        {title: "사카이 & 기시와다", regional: "sakai&kisiwada"},
        {title: "이케다", regional: "ikeda"},
    ];
    const saveList = [];
    const [, setRegional] = regional;

    regionaArray.forEach((v, i) => {
        saveList.push(
            <div className="listBtn" key={i}  onMouseEnter={e => {
                setRegional(v.regional);
            }} onTouchStart={e=>{
                setRegional(v.regional);
            }} > 
                <Link to="/detail_page" >{v.title}<span className="before">{v.title}</span><span className="after">{v.title}</span></Link>
            </div>
        );
    });
    
    return (
        <div className="RegionalList">
            {saveList}
        </div>
    );
};


export default RegionalList;