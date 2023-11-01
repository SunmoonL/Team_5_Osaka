import './scss/TitleText.scss';
// import { useState, useEffect } from 'react';


const TitleText = ({children}) => {
    children = <img className="logoImg" src="/images/logo.png" alt="THIS IS OSAKA" />
    return (
        <div className="TitleText">
            {children}
        </div>
    );
};


export default TitleText;