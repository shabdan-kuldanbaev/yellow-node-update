/* eslint-disable react/destructuring-assignment */
import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import Reveal from 'react-reveal/Reveal';
import Fade from 'react-reveal/Fade';

// TODO -> ...props
export const Animated = (props) => {
  if (props.isReveal) {
    return (
      <Reveal {...props}>
        {props.children}
      </Reveal>
    );
  }

  if (props.isFade) {
    return (
      <Fade {...props}>
        {props.children}
      </Fade>
    );
  }

  return (
    <ScrollAnimation {...props}>
      {props.children}
    </ScrollAnimation>
  );
};

Animated.defaultProps = {
  isReveal: false,
  isFade: false,
};
