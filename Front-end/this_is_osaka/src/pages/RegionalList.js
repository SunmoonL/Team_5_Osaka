import './scss/RegionalList.scss';
import {Link} from "react-router-dom";

const RegionalList = ( {regional} ) => {
    const regionaArray = [              // 지역의 한글명과 영문명을 갖고있는 배열
        {title: "오사카만", regional: "osaka_port"},
        {title: "도톤보리", regional: "dotonbori"},
        {title: "난바", regional: "nanba"},
        {title: "시텐노지 사원", regional: "shitennogi"},
        {title: "오사카시 북부", regional: "osaka_north"},
        {title: "오사카성", regional: "osaka_castle"},
        {title: "사카이 & 기시와다", regional: "sakai&kisiwada"},
        {title: "이케다", regional: "ikeda"},
    ];
    const saveList = [];                // 지역 리스트 버튼을 저장할 배열
    const [, setRegional] = regional;   // 지역을 세팅 할 set 함수

    regionaArray.forEach((v, i) => {    // 지역 배열을 돌리며 저장
        saveList.push(                  // push를 통해 왼쪽에서부터 객체를 순서대로 저장
            <div className="listBtn" key={i}  onMouseEnter={() => setRegional(v.regional)} onTouchStart={() => setRegional(v.regional)} > 
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