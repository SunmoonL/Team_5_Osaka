import './scss/Explanation.scss';
//import './scss/Common.scss'
// import { useState, useEffect } from 'react';

const Explanation = ({children, detailTitle, detailContent}) => {
    if (detailContent !== "" && detailTitle !== "") {
        console.log(detailContent);
    }
    return (
        <div className="Explanation">
            <h3>{detailTitle}</h3>
            {children}
        </div>
    );
};
export default Explanation;
