import './css/Contents.css';
// import { useState, useEffect } from 'react';

const Contents = ({children}) => {
    return (
        <div className="Contents">
            {children}
        </div>
    );
};


export default Contents;