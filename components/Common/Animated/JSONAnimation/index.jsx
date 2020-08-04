/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import Lottie from 'react-lottie';
import PropTypes from 'prop-types';

export const JSONAnimation = ({ jsonFile }) => {
  const [state, setState] = useState({ isStopped: false, isPaused: false }); // TODO

  const defaultOptions = {
    loop: true,
    autoplay: false,
    animationData: jsonFile,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Lottie
      options={defaultOptions}
      isStopped={state.isStopped}
      isPaused={state.isPaused}
    />
  );
};

JSONAnimation.propTypes = {
  jsonFile: PropTypes.string.isRequired,
};
