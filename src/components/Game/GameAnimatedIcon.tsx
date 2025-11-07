import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../lotties/677-trophy.json';

const GameAnimatedIcon = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  // @ts-ignore - Type conflict between react-lottie and React 18
  return <Lottie options={defaultOptions} />;
};

export default GameAnimatedIcon;
