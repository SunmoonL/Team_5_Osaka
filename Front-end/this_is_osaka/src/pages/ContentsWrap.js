import './scss/ContentsWrap.scss';
//import { useState, useEffect } from 'react';

const ContentsWrap = ({children}) => {

    return (
        <div className="ContentsWrap">
            {children}
       </div>
    );
};


export default ContentsWrap;