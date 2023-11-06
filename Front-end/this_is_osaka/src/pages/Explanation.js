import './scss/Explanation.scss';
import { useState, useEffect } from 'react';

const GetDB = async()=>{
    const url = `http://kkms4001.iptime.org:10093/question_list/`
    const response = await fetch(url);
    const data = await response.json();
    let needData = await Object.values(data)[0]
    return needData;
};

const Explanation = ({children, detailTitle, detailContent, imgFolder}) => {
    
    const [changeCategory, setChangeCategory] = useState("")
    const questionImgSrc = `${process.env.PUBLIC_URL}/images/${imgFolder}/${changeCategory}/2.Takoyasu.jpg`
    const categoryList = [{food:'음식'}, {hotel:'호텔'}, {place:'관광지'}] 
    
    const mouseClickFunc= (key, i) =>{
        console.log(questionImgSrc)
        console.log(GetDB().first_link)
        setChangeCategory(key) 
        const questionList = document.getElementById("questionList").children;
        questionList[i].classList.add('colorChange')
    }
    const QuestionList = ()=>{
        const saveList = [];
        categoryList.forEach((value, i)=>{
            for(let key in value){
                saveList.push(<li key={i} onClick={ () =>  mouseClickFunc(key, i) }>{value[key]}</li>)
            }
        })
        return saveList;

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
                        <a href="https://www.naver.com/" target="_blank">
                            <img src={`${process.env.PUBLIC_URL}/images/map.png`}/>
                        </a>
                    </div>
                </div>
            );
        };
        return listItem;
    }
    /*
    if (detailContent !== "" && detailTitle !== "") {
        console.log(detailContent);
    }
    */
    return (
        <div className="Explanation">
            <h3>{detailTitle}</h3>
            <p>{detailContent}</p>
            <ul id="questionList">
                
                {QuestionList()}
            </ul>
            <div className="questionImg">
                {ExplanationImg()}
            </div>
            {children}
        </div>
    );
};
export default Explanation;
