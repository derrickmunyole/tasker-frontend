import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../assets/animations/success.json';

const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};

function SuccessIndicator() {
    return (
        <div style={containerStyle}>
            <Lottie options={defaultOptions} height={100} width={100} />
        </div>
    );
}

const containerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
};

export default SuccessIndicator;
