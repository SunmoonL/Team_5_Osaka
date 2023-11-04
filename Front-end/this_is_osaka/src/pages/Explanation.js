import './scss/Explanation.scss';
import { useState, useEffect } from 'react';

const Explanation = ({children, detailTitle, detailContent, imgFolder}) => {

    const [changeCategory, setChangeCategory] = useState("")
    const questionImgSrc = `${process.env.PUBLIC_URL}/images/${imgFolder}/${changeCategory}/2.Takoyasu.jpg`

    const QuestionList = ()=>{
        return (
            <ul id="questionList">
                <li onClick={ () => setChangeCategory('food') }>음식</li>
                <li onClick={ () => setChangeCategory('hotel') }>호텔</li>
                <li onClick={ () => setChangeCategory('place') }>관광지</li>
            </ul>
        )
    }


    const ExplanationImg = ()=>{
        const listItem = []
        for(let i=0; i<4; i++){
            listItem.push(
                <div key={i} className="imgBox">
                    <div className="darken">
                        <p className="imgTitle"># 스시</p>
                    </div>
                    <img className="explanImg" src={questionImgSrc}/>
                    <div className="mapGo">
                        <a href="https://www.naver.com/">
                            <img src={`${process.env.PUBLIC_URL}/images/map.png`}/>
                        </a>
                    </div>
                </div>
            );
        };
        return listItem;
    }

    if (detailContent !== "" && detailTitle !== "") {
        console.log(detailContent);
    }

    return (
        <div className="Explanation">
            <h3>{detailTitle}</h3>
            <p>{detailContent}</p>
            {QuestionList()}
            <div className="questionImg">
                {ExplanationImg()}
            </div>
            {children}
        </div>
    );
};
export default Explanation;
