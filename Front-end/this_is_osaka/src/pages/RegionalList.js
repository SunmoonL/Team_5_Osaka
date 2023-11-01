import './scss/RegionalList.scss';
// import { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import { useState, useEffect } from 'react';
import Explanation from './Explanation';

const RegionalList = ({changeBackground, changePrevBackground, setDetailTitle, setDetailContent}) => {
   const regionaArray = [ { title:"오사카만 지역", content:"수족관, 세계 수준의 놀이공원, 유니버설 스튜디오 재팬 등이 있는 최고의 관광지"},
                            { title:"도톤보리", content: "휘황찬란한 빛과 생동감, 대도시 오사카의 풍류"},
                            { title:"난바", content:"미식가, 애니메이션 매니아, 예술가들을 위한 장소"},
                            { title:"덴노지사원", content:"오사카의 옛 도심의 부활"},
                            { title:"오사카시북부", content:"신오사카와 오사카/우메다역 인근의 식당과 쇼핑 공간"},
                            { title:"오사카성", content:"도시를 떠나 휴식하기 좋은 울창한 숲이 있는 공원 "},
                            { title:"사카이 & 기시와다", content:"오사카에 인접한 5세기 거대고분"},
                            { title:"이케다", content:"오사카 북부의 자연 트레킹 및 브로드웨이식 공연 감상"},
                        ];
    const saveList = [];
    const [ BackgroundSrc, setBackground ] = changeBackground;
    const setPrevBackground = changePrevBackground;
    
    console.log(regionaArray[0].title);

    const settingFunc = (i) => {
        setPrevBackground(BackgroundSrc);
        setBackground(regionaArray[i].title);
        setDetailTitle(regionaArray[i].title);
        setDetailContent(regionaArray[i].content); 
    };

    regionaArray.forEach((v, i) => {
        saveList.push(
            <div key={i}  onMouseOver={e => {
                if (BackgroundSrc !== regionaArray[i].title ) {
                    settingFunc(i);
                }
            }}>
                <Link to="/detail_page" >{v.title}</Link>
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