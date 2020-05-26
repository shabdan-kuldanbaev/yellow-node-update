/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import Lottie from 'react-lottie';
import animationData from './data/test.json';

export const JSONAnimation = () => {
  const [state, setState] = useState({ isStopped: false, isPaused: false });

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
    <div
      className="controlled"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Lottie
        options={defaultOptions}
        // TODO width={250}
        // TODO height={275}s
        isStopped={state.isStopped}
        isPaused={state.isPaused}
      />
      <div style={{ marginTop: '30px' }}>
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
    </div>
  );
};
