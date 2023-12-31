import './scss/Explanation.scss';
import { useState, useEffect } from 'react';

const Explanation = ({children, regional, imgContent, storeName}) => {
    const [changeCategory, setChangeCategory] = useState("");      // 현재 클릭한 카테고리를 가르키는 state
    const nowRegional = {                                          // 현재 지역의 한글명
        "osaka_port": "오사카만", 
        "dotonbori" : "도톤보리", 
        "nanba": "난바",
        "shitennogi": "시텐노지 사원", 
        "osaka_north": "오사카시 북부", 
        "osaka_castle": "오사카성",
        "sakai&kisiwada":"사카이 & 기시와다", 
        "ikeda": "이케다"
    }[regional];
    const nowContent = {                                            // 현재 지역의 대한 설명
        "osaka_port": "수족관, 세계 수준의 놀이공원, 유니버설 스튜디오 재팬 등이 있는 최고의 관광지",
        "dotonbori" : "휘황찬란한 빛과 생동감, 대도시 오사카의 풍류",
        "nanba": "미식가, 애니메이션 매니아, 예술가들을 위한 장소",
        "shitennogi": "오사카의 옛 도심의 부활", 
        "osaka_north": "신오사카와 오사카/우메다역 인근의 식당과 쇼핑 공간",
        "osaka_castle": "도시를 떠나 휴식하기 좋은 울창한 숲이 있는 공원 ", 
        "sakai&kisiwada":"오사카에 인접한 5세기 거대고분",
        "ikeda": "오사카 북부의 자연 트레킹 및 브로드웨이식 공연 감상"
    }[regional];
    const categoryClick = category => setChangeCategory(category);  // 카테고리를 변경하는 함수
    const categoryList = [["관광지", "location"], ["맛집", "food"], ["숙소", "hotel"]].map((v, i) => {
        if (changeCategory === v[1]) {                              // 추천을 받았는지, 선택이 됐는지에 따라 객체를 리턴하는 조건
            return  <li className='colorChange' key={i} onClick={e => categoryClick(v[1])}> {v[0]}</li>;
        } else if (imgContent[v[1]]) {
            return  <li key={i} onClick={e => categoryClick(v[1])}> {v[0]}</li>;
        }
        return ;
    });
    let explanationImg = [];

    if (storeName[changeCategory] !== undefined) {                  // 현재 카태고리가 추천을 받았다면 실행되는 조건
        explanationImg = storeName[changeCategory].map((v, i) => {  // map을 통해 설계한 객체들을 배열로 받는 코드
            if (v === undefined) { return; }
            return (
                <div key={i} className="imgBox">
                    <div className="darken">
                        <p className="imgTitle">{v[0]}</p>
                    </div>
                    <a href={v[1]} target="_blank">
                        <img className="explanImg" src={`${process.env.PUBLIC_URL}/images/${regional}/${changeCategory}/${i + 1}.jpg`} />
                        <div className="mapGo">
                            <img src={`${process.env.PUBLIC_URL}/images/map.png`} />
                        </div>
                    </a>
                </div>
            );
        });
    }
    useEffect(() => {    // 조건을 확인 후 Content가 있다면 그 Content를 현재 카테고리로 변경, 없다면 빈값으로 변경하는 구문
        if (imgContent["location"]) { setChangeCategory("location");} 
        else if (imgContent["food"]) { setChangeCategory("food");} 
        else if (imgContent["hotel"]) { setChangeCategory("hotel");} 
        else { setChangeCategory(""); }
    }, [imgContent]);   // 랜더링직후와 imgContent의 변경이 일어날때 실행되는 구문
    return (
        <div className="Explanation">
            <h3>{nowRegional}</h3>
            <p>{nowContent}</p>
            <ul id="questionList">
                {categoryList}
            </ul>
            <div className="questionImg">
                {explanationImg}
            </div>
            {children}
        </div>
    );
};
export default Explanation;
