import './scss/Background.scss';
import { useState, useEffect } from 'react';

const Background = ({children, BackgroundSrc, prevBackgroundSrc}) => {
    const nowSrc = `${process.env.PUBLIC_URL}/images/${BackgroundSrc}.jpg`;
    const prevSrc = `${process.env.PUBLIC_URL}/images/${prevBackgroundSrc}.jpg`;

    useEffect(() => {
        const target = document.getElementById("prevImg");
        console.log(target);
        target.classList.remove("prevImg");
        void target.offsetWidth;
        target.classList.add("prevImg");
    });

    return (
        <div className="Background">
            <div className="darkenBox"></div>
            <img src={nowSrc}></img>
            <img id='prevImg' className='prevImg' src={prevSrc}></img>
            {children}
        </div>
    );
};


export default Background;