import './scss/TitleText.scss';
// import { useState, useEffect } from 'react';


const TitleText = ({children}) => {
    return (
        <div className="TitleText">
            <img className="logoImg" src="/images/logo.png" alt="THIS IS OSAKA" />
            {children}
        </div>
    );
};


export default TitleText;