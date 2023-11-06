import './scss/Background.scss';
import { useState, useEffect } from 'react';

const Background = ({children, regional}) => {
    const [testRegional] = regional;
    const nowSrc = `${process.env.PUBLIC_URL}/images/osaka_main_img/${testRegional}.jpg`;
    
    useEffect(() => {
        const nowImg = document.getElementById("nowImg");
        nowImg.classList.remove("nowImg");
        void nowImg.offsetWidth;
        nowImg.classList.add("nowImg");
    });

    return (
        <div className="Background">
            <div className="darkenBox"></div>
            <img id="nowImg" className='nowImg' src={nowSrc}></img>
            {children}
        </div>
    );
};


export default Background;