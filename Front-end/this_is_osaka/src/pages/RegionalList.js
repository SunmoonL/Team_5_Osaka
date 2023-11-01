import './css/RegionalList.css';
// import { useState, useEffect } from 'react';
import {Link} from "react-router-dom";


const RegionalListItem = () => {
    const regionalList = [ '오사카만 지역','도톤보리 & 신사이바시', '남바', '덴노지사원',
                            '오사키시 북부', '오사카성과 그 주변', '사카이 & 기시와다', '이케다']
    const reginoalListItem = regionalList.map((object)=>{
        return(
            <button>
                <Link to="/a">{object}</Link>
            </button>
        )
    })
    return reginoalListItem;
}

const RegionalList = () => {
    return(
        <div className="RegionalList">
            지역 리스트
            <RegionalListItem/>
        </div>
    )  
    /*
    return (
        <div className="RegionalList">
            지역 리스트
            <button>
                <Link to="/a"> test button</Link>
            </button>
        </div>
    );
    */
};


export default RegionalList;