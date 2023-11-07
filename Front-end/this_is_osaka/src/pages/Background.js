import './scss/Background.scss';
import { useEffect } from 'react';

const Background = ({children, regional}) => {
    const [regionalName] = regional;
    
    useEffect(() => {
        const nowImg = document.getElementById(regionalName);
        const nowFlag = document.getElementsByClassName("displayFlag")[0];
        nowFlag.classList.remove("displayFlag");
        nowImg.classList.add("displayFlag");
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