import './scss/Background.scss';
import { useState, useEffect } from 'react';

const Background = ({children, BackgroundSrc, prevBackgroundSrc}) => {
    const nowSrc = `${process.env.PUBLIC_URL}/images/osaka_main_img/${BackgroundSrc}`;
    const prevSrc = `${process.env.PUBLIC_URL}/images/osaka_main_img/${prevBackgroundSrc}`;
    const fourArrow = [ 'top', 'right', 'bottom', 'left'];
    const randomNum = Math.floor( Math.random() * 4 )
    
    useEffect(() => {
        const nowImg = document.getElementById("nowImg");
        const prevImg = document.getElementById("prevImg");
        const randomAni = fourArrow[randomNum]+'Ani';

        nowImg.classList.remove("nowImg");
        nowImg.classList.remove(randomAni);
        prevImg.classList.remove("prevImg");

        void nowImg.offsetWidth;
        void prevImg.offsetWidth;
        
        nowImg.classList.add("nowImg");
        nowImg.classList.add(randomAni);
        prevImg.classList.add("prevImg");
    });


    return (
        <div className="Background">
            <div className="darkenBox"></div>
            <img id="nowImg" className="nowImg" src={nowSrc}></img>
            <img id='prevImg' className='prevImg' src={prevSrc}></img>
            {children}
        </div>
    );
};


export default Background;