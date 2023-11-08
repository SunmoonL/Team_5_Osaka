import './scss/Background.scss';
import { useEffect } from 'react';

const Background = ({children, regional}) => {
    const [regionalName] = regional; // 햔재 지역
    
    useEffect(() => {
        const nowFlag = document.getElementsByClassName("displayFlag")[0]; // 이전 사진의 DOM객체 참조
        const nowImg = document.getElementById(regionalName); // 현재 지역의 이름을 ID로 갖고 있는 img DOM객체 참조
        
        nowFlag.classList.remove("displayFlag"); // 이전 사진의 flag를 삭제해서 display:none 활성화
        nowImg.classList.add("displayFlag"); // 현재 지역에 flag를 추가해서 display:none 무력화
    });
        
    return (
        <div className="Background">
            <div className="darkenBox"></div>
            <img id="main" className='nowImg displayFlag' src={`${process.env.PUBLIC_URL}/images/osaka_main_img/main.jpg`} alt="오사카"></img>
            <img id="osaka_port" className='nowImg' src={`${process.env.PUBLIC_URL}/images/osaka_main_img/osaka_port.jpg`} alt="오사카만"></img>
            <img id="dotonbori" className='nowImg' src={`${process.env.PUBLIC_URL}/images/osaka_main_img/dotonbori.jpg`} alt="도톤보리"></img>
            <img id="nanba" className='nowImg' src={`${process.env.PUBLIC_URL}/images/osaka_main_img/nanba.jpg`} alt="난바"></img>
            <img id="shitennogi" className='nowImg' src={`${process.env.PUBLIC_URL}/images/osaka_main_img/shitennogi.jpg`} alt="시텐노지"></img>
            <img id="osaka_north" className='nowImg' src={`${process.env.PUBLIC_URL}/images/osaka_main_img/osaka_north.jpg`} alt="오사카 북부"></img>
            <img id="osaka_castle" className='nowImg' src={`${process.env.PUBLIC_URL}/images/osaka_main_img/osaka_castle.jpg`} alt="오사카성"></img>
            <img id="sakai&kisiwada" className='nowImg' src={`${process.env.PUBLIC_URL}/images/osaka_main_img/sakai&kisiwada.jpg`} alt="사카이&기시와다"></img>
            <img id="ikeda" className='nowImg' src={`${process.env.PUBLIC_URL}/images/osaka_main_img/ikeda.jpg`} alt="이케다"></img>
            {children}
        </div>
    );
};


export default Background;