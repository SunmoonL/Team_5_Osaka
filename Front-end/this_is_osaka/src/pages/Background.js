import './scss/Background.scss';
import { useState, useEffect } from 'react';

const Background = ({children, BackgroundSrc, prevBackgroundSrc}) => {
    
    const nowSrc = `${process.env.PUBLIC_URL}/images/osaka_main_img/${BackgroundSrc}`;
    const prevSrc = `${process.env.PUBLIC_URL}/images/osaka_main_img/${prevBackgroundSrc}`;
    
    useEffect(() => {
        const prevImg = document.getElementById("prevImg");
        const nowImg = document.getElementById("nowImg");
        
        prevImg.classList.remove("prevImg");
        nowImg.classList.remove("nowImg");
        
        void prevImg.offsetWidth;
        prevImg.classList.add("prevImg");
        nowImg.classList.add("nowImg");
    });

    return (
        <div className="Background">
            <div className="darkenBox"></div>
            <img id="nowImg" className='nowImg' src={nowSrc}></img>
            <img id='prevImg' className='prevImg' src={prevSrc}></img>
        </div>
    );
};


export default Background;