import './scss/RegionalList.scss';
// import { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import { useState, useEffect } from 'react';
import Explanation from './Explanation';

const RegionalList = ( {changeBackground, changePrevBackground, setDetailTitle, setDetailContent, setImgFolder} ) => {
   const regionaArray = [ { title:"오사카만", content:"수족관, 세계 수준의 놀이공원, 유니버설 스튜디오 재팬 등이 있는 최고의 관광지",
                            imgFolder:"osaka_man", backgroundSrc:"osaka_port.jpg"},
                            { title:"도톤보리", content: "휘황찬란한 빛과 생동감, 대도시 오사카의 풍류",
                            imgFolder:"osaka_man", backgroundSrc:"dotonbori.jpg"},
                            { title:"난바", content:"미식가, 애니메이션 매니아, 예술가들을 위한 장소",
                            imgFolder:"osaka_man", backgroundSrc:"nanba.jpg"},
                            { title:"시텐노지사원", content:"오사카의 옛 도심의 부활",
                            imgFolder:"osaka_man", backgroundSrc:"Tennoji_temple.jpg"},
                            { title:"오사카시북부", content:"신오사카와 오사카/우메다역 인근의 식당과 쇼핑 공간",
                            imgFolder:"osaka_man", backgroundSrc:"osaka_north.jpg"},
                            { title:"오사카성", content:"도시를 떠나 휴식하기 좋은 울창한 숲이 있는 공원 ",
                            imgFolder:"osaka_man", backgroundSrc:"osaka_castle_2.jpg"},
                            { title:"사카이 & 기시와다", content:"오사카에 인접한 5세기 거대고분",
                            imgFolder:"osaka_man", backgroundSrc:"sakai.jpg"},
                            { title:"이케다", content:"오사카 북부의 자연 트레킹 및 브로드웨이식 공연 감상",
                            imgFolder:"osaka_man", backgroundSrc:"ikeda.jpg"},
                        ];
    const saveList = [];
    const [ BackgroundSrc, setBackground ] = changeBackground;
    const setPrevBackground = changePrevBackground;

    const mouseOverFunc = (i) => {
        setPrevBackground(BackgroundSrc);
        setBackground(regionaArray[i].backgroundSrc);
    } 
    const mouseClickFunc = (i) => {
        setDetailTitle(regionaArray[i].title);
        setDetailContent(regionaArray[i].content); 
        setImgFolder(regionaArray[i].imgFolder);
    } 

    regionaArray.forEach((v, i) => {
        saveList.push(
            <div className="listBtn" key={i}  onMouseEnter={e => {
                if (BackgroundSrc !== regionaArray[i].backgroundSrc ) {
                    mouseOverFunc(i);
                }
            }} onClick={e => { mouseClickFunc(i); }}
            onMouseLeave={() => {
                setPrevBackground("main");
                setBackground("main.jpg");
            }}>
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