/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import Lottie from 'react-lottie';
import animationData from './json/data.json';

export const JSONAnimation = () => {
  const [state, setState] = useState({ isStopped: false, isPaused: false })

  const buttonStyle = {
    display: 'inline-block',
    marginRight: '10px',
    border: 'none',
    color: 'white',
    backgroundColor: '#647DFF',
    borderRadius: '2px',
    fontSize: '15px',
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="controlled">
      <Lottie
        options={defaultOptions}
        height={400}
        width={400}
        isStopped={state.isStopped}
        isPaused={state.isPaused}
      />
      <button style={buttonStyle} onClick={() => setState({ ...state, isStopped: true })}>
        Stop
      </button>
      <button style={buttonStyle} onClick={() => setState({ isStopped: false, isPaused: false })}>
        Play
      </button>
      <button style={buttonStyle} onClick={() => setState({ ...state, isPaused: !state.isPaused })}>
        Pause
      </button>
    </div>
  );
};
