import React, { useRef } from 'react';
import PropTypes from 'prop-types';
// TODO import gsap from 'gsap';

export const Gsap = ({ children }) => {
  const animateRef = useRef(null);

  return (
    <div ref={animateRef}>
      {children}
    </div>
  );
};

Gsap.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};
