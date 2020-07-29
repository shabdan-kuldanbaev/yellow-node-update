/* eslint-disable react/destructuring-assignment */
import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import Reveal from 'react-reveal/Reveal';
import Fade from 'react-reveal/Fade';
import { animatedType } from 'utils/constants';
import { CastomAnimation } from './CastomAnimation';
import { JSONAnimation } from './JSONAnimation';
import { ParallaxWrapper } from './ParallaxSpring';

// TODO props
export const Animated = (props) => {
  switch (props.type) {
    case animatedType.isReveal:
      return (
        <Reveal {...props}>
          {props.children}
        </Reveal>
      );
    case animatedType.isFade:
      return (
        <Fade {...props}>
          {props.children}
        </Fade>
      );
    case animatedType.isCustom:
      return (
        <CastomAnimation {...props}>
          {props.children}
        </CastomAnimation>
      );
    case animatedType.isJSON:
      return (
        <JSONAnimation {...props}>
          {props.children}
        </JSONAnimation>
      );
    case animatedType.isParallaxSpring:
      return (
        <ParallaxWrapper {...props}>
          {props.children}
        </ParallaxWrapper>
      );
    default:
      return (
        <ScrollAnimation {...props}>
          {props.children}
        </ScrollAnimation>
      );
  }
};

Animated.defaultProps = {
  isReveal: false,
  isFade: false,
  isCustom: false,
};
