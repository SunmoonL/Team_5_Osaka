import './scss/TitleText.scss';
// import { useState, useEffect } from 'react';


const TitleText = ({children, regional}) => {
    const [testRegional, setRegional] = regional;
    return (
        <div className="TitleText">
            <img className="mainTitle" src="/images/logo.png" alt="THIS IS OSAKA" onMouseOver={() => {
                setRegional("main");
            }} />
            {children}
        </div>
    );
};


export default TitleText;