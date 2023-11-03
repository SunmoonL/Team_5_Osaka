import './scss/Explanation.scss';
import { useState, useEffect } from 'react';

/*
const GetDB = async()=>{
    const url = `http://kkms4001.iptime.org:10093/question_list/`
    const response = await fetch(url);
    const data = await response.json();
    let needData = await Object.values(data)[0]
    return needData;
};
*/



const Explanation = ({children, detailTitle, detailContent, imgFolder}) => {
    /*
    const [readDB, setReadDB] = useState(null); 
    useEffect(() => {
        GetDB().then( result => setReadDB(result) )
    }, []);
    */
    
    const [changeCategory, setChangeCategory] = useState("")

    const imgSrc = imgFolder/changeCategory

    const QuestionList = ()=>{
        console.log(changeCategory)
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
                <div className="imgBox">
                    <p className="imgTitle"># 스시</p>
                    <div className="darken"></div>
                    <img src='images/{imgFolder}/{changeCategory}/${i}' />
                    <div><a href="https://www.naver.com/"></a></div>
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
