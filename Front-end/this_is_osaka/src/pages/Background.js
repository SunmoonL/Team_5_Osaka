import './css/Background.css';
// import { useState, useEffect } from 'react';

const Background = ({children, BackgroundSrc}) => {
    console.log(BackgroundSrc);

    return (
        <div className="Background">
            {children}
        </div>
    );
};


export default Background;