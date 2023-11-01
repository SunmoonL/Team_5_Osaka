import './css/RegionalList.css';
// import { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

const RegionalList = ({changeBackground, changePrevBackground}) => {
    const regionaArray = ["남바","덴노지사원","도돈보리&신사이바시","사카이&기시와다","오사카만지역","오사카성과 그 주변","오사카시북부","이케다"];
    const saveList = [];
    const [BackgroundSrc, setBackground] = changeBackground;
    const setPrevBackground = changePrevBackground;

    regionaArray.forEach((v, i) => {
        saveList.push(
            <div key={i}  onMouseOver={e => {
                if (BackgroundSrc !== regionaArray[i]) {
                    setPrevBackground(BackgroundSrc);
                    setBackground(regionaArray[i]);
                }
            }}>
                <Link to="/detail_page">{v}</Link>
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