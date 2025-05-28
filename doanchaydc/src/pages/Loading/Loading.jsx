import React from 'react';
import images from "../../assets/loadImg.js";
import '../../styles/Loading.css'
const Loading = () => {
  return (
    <div className='loading_web'>
     <img src={images["logo2.png"]}></img>
     
    </div>
  );
};

export default Loading;
