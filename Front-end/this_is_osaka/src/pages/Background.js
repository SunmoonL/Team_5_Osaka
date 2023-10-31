import './css/Background.css';
// import { useState, useEffect } from 'react';

const Background = ({children}) => {
    return (
        <div className="Background">
            {children}
        </div>
    );
};


export default Background;