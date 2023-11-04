import './scss/TitleText.scss';
// import { useState, useEffect } from 'react';


const TitleText = ({children, backgroundSet}) => {
    const [BackgroundSrc, setBackground, setPrevBackground] = backgroundSet;
    return (
        <div className="TitleText">
            <img className="logoImg" src="/images/logo.png" alt="THIS IS OSAKA" onMouseOver={() => {
                setBackground("main.jpg");
                setPrevBackground(BackgroundSrc);
            }} />
            {children}
        </div>
    );
};


export default TitleText;