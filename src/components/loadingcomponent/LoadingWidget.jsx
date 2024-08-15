import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../assets/animations/loading.json';

const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
 

function LoadingIndicator() {
    return (
        <Lottie options={defaultOptions} height={100} width={100} />
    );
  }


export default LoadingIndicator;