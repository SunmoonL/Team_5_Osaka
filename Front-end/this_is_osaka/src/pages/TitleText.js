import './css/TitleText.css';
// import { useState, useEffect } from 'react';

const TitleText = ({children}) => {
    return (
        <div className="TitleText">
            {children}
        </div>
    );
};


export default TitleText;