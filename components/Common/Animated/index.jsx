/* eslint-disable react/destructuring-assignment */
import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import Reveal from 'react-reveal/Reveal';
import Fade from 'react-reveal/Fade';
import { animatedType } from 'utils/constants';
import { CustomAnimation } from './CustomAnimation';
import { JSONAnimation } from './JSONAnimation';
import { ParallaxWrapper } from './ParallaxSpring';
import ImageZoom from './ImageZoom';
import { Gsap } from './Gsap';

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
    if (Object.keys(props).length === 1) {
      return <div>{props.children}</div>;
    }
    return (
      <CustomAnimation {...props}>
        {props.children}
      </CustomAnimation>
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
  case animatedType.imageZoom:
    return (
      <ImageZoom {...props}>
        {props.children}
      </ImageZoom>
    );
  case animatedType.gsap:
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
