import './scss/Background.scss';
import { useState, useEffect } from 'react';

const Background = ({children, regional}) => {
    const [testRegional] = regional;
    const nowSrc = `${process.env.PUBLIC_URL}/images/osaka_main_img/${testRegional}.jpg`;
    
    useEffect(() => {
        const nowImg = document.getElementById(testRegional);
        const nowFlag = document.getElementsByClassName("displayFlag")[0];
        nowFlag.classList.remove("displayFlag");
        nowImg.classList.add("displayFlag");
    });
        
    return (
        <div className="Background">
            <div className="darkenBox"></div>
            <img id="main" className='nowImg displayFlag' src={`${process.env.PUBLIC_URL}/images/osaka_main_img/main.jpg`}></img>
            <img id="osaka_port" className='nowImg' src={`${process.env.PUBLIC_URL}/images/osaka_main_img/osaka_port.jpg`}></img>
            <img id="dotonbori" className='nowImg' src={`${process.env.PUBLIC_URL}/images/osaka_main_img/dotonbori.jpg`}></img>
            <img id="nanba" className='nowImg' src={`${process.env.PUBLIC_URL}/images/osaka_main_img/nanba.jpg`}></img>
            <img id="shitennogi" className='nowImg' src={`${process.env.PUBLIC_URL}/images/osaka_main_img/shitennogi.jpg`}></img>
            <img id="osaka_north" className='nowImg' src={`${process.env.PUBLIC_URL}/images/osaka_main_img/osaka_north.jpg`}></img>
            <img id="osaka_castle" className='nowImg' src={`${process.env.PUBLIC_URL}/images/osaka_main_img/osaka_castle.jpg`}></img>
            <img id="sakai&kisiwada" className='nowImg' src={`${process.env.PUBLIC_URL}/images/osaka_main_img/sakai&kisiwada.jpg`}></img>
            <img id="ikeda" className='nowImg' src={`${process.env.PUBLIC_URL}/images/osaka_main_img/ikeda.jpg`}></img>
            {children}
        </div>
    );
};


export default Background;