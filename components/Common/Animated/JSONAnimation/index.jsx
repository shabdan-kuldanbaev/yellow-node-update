/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import Lottie from 'react-lottie';
import PropTypes from 'prop-types';

export const JSONAnimation = ({ jsonFile }) => {
  // TODO
  const [state, setState] = useState({ isStopped: false, isPaused: false });

  const defaultOptions = {
    loop: true,
    autoplay: false,
    animationData: jsonFile,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div>
      <Lottie
        options={defaultOptions}
        // TODO width={250} height={275}
        isStopped={state.isStopped}
        isPaused={state.isPaused}
      />
    </div>
  );
};

JSONAnimation.propTypes = {
  jsonFile: PropTypes.string.isRequired,
};
