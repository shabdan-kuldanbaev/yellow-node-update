/* eslint-disable react/destructuring-assignment */
import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import Reveal from 'react-reveal/Reveal';
import Fade from 'react-reveal/Fade';
import { ANIMATED_TYPE } from 'utils/constants';
import { CustomAnimation } from './CustomAnimation';
import { JSONAnimation } from './JSONAnimation';
import { ParallaxWrapper } from './ParallaxSpring';
import ImageZoom from './ImageZoom';
import { Gsap } from './Gsap';

export const Animated = (props) => {
  switch (props.type) {
  case ANIMATED_TYPE.isReveal:
    return (
      <Reveal {...props}>
        {props.children}
      </Reveal>
    );
  case ANIMATED_TYPE.isFade:
    return (
      <Fade {...props}>
        {props.children}
      </Fade>
    );
  case ANIMATED_TYPE.isCustom:
    if (Object.keys(props).length === 1) {
      return <div>{props.children}</div>;
    }
    return (
      <CustomAnimation {...props}>
        {props.children}
      </CustomAnimation>
    );
  case ANIMATED_TYPE.isJSON:
    return (
      <JSONAnimation {...props}>
        {props.children}
      </JSONAnimation>
    );
  case ANIMATED_TYPE.isParallaxSpring:
    return (
      <ParallaxWrapper {...props}>
        {props.children}
      </ParallaxWrapper>
    );
  case ANIMATED_TYPE.imageZoom:
    return (
      <ImageZoom {...props}>
        {props.children}
      </ImageZoom>
    );
  case ANIMATED_TYPE.gsap:
    return (
      <Gsap {...props}>
        {props.children}
      </Gsap>
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
