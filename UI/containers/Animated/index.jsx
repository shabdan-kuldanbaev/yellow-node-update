'use client';

/* eslint-disable react/destructuring-assignment */
import dynamic from 'next/dynamic';
import { ANIMATED_TYPE } from 'utils/constants';

const ScrollAnimation = dynamic(() => import('react-animate-on-scroll'));
const Reveal = dynamic(() => import('react-reveal/Reveal').then((module) => module.default));
const Fade = dynamic(() => import('react-reveal/Fade').then((module) => module.default));
const CSSAnimation = dynamic(() => import('./CSSAnimation').then((module) => module.CSSAnimation));
const ImageZoom = dynamic(() => import('./ImageZoom'));
const Gsap = dynamic(() => import('./Gsap').then((module) => module.Gsap));
const ParallaxWrapper = dynamic(() => import('./ParallaxSpring'));
const ExpandWrapper = dynamic(() => import('./Expand').then((module) => module.ExpandWrapper));
const CustomAnimation = dynamic(() => import('./CustomAnimation').then((module) => module.CustomAnimation));
const JSONAnimation = dynamic(() => import('./JSONAnimation').then((module) => module.JSONAnimation));
const Bounce = dynamic(() => import('react-reveal/Bounce'));
const CounterAnimation = dynamic(() => import('UI/containers/Animated/CounterAnimation'));
const ZoomOut = dynamic(() => import('./ZoomOut'));

const Animated = (props) => {
  switch (props.type) {
  case ANIMATED_TYPE.isReveal: {
    return (
      <Reveal {...props}>
        {props.children}
      </Reveal>
    );
  }
  case ANIMATED_TYPE.isFade: {
    return (
      <Fade {...props}>
        {props.children}
      </Fade>
    );
  }
  case ANIMATED_TYPE.isCustom: {
    if (Object.keys(props).length === 1) {
      return <div>{props.children}</div>;
    }

    return (
      <CustomAnimation {...props}>
        {props.children}
      </CustomAnimation>
    );
  }
  case ANIMATED_TYPE.isJSON: {
    return (
      <JSONAnimation {...props}>
        {props.children}
      </JSONAnimation>
    );
  }
  case ANIMATED_TYPE.isParallaxSpring: {
    return (
      <ParallaxWrapper {...props}>
        {props.children}
      </ParallaxWrapper>
    );
  }
  case ANIMATED_TYPE.imageZoom: {
    return (
      <ImageZoom {...props}>
        {props.children}
      </ImageZoom>
    );
  }
  case ANIMATED_TYPE.gsap: {
    return (
      <Gsap {...props}>
        {props.children}
      </Gsap>
    );
  }
  case ANIMATED_TYPE.expandByHeight: {
    return (
      <ExpandWrapper {...props}>
        {props.children}
      </ExpandWrapper>
    );
  }
  case ANIMATED_TYPE.isCSS: {
    return (
      <CSSAnimation {...props}>
        {props.children}
      </CSSAnimation>
    );
  }
  case ANIMATED_TYPE.bounce: {
    return (
      <Bounce {...props}>
        <div>
          {props.children}
        </div>
      </Bounce>
    );
  }
  case ANIMATED_TYPE.counter: {
    return (
      <CounterAnimation {...props}>
        {props.children}
      </CounterAnimation>
    );
  }
  case ANIMATED_TYPE.zoomOut: {
    return (
      <ZoomOut {...props}>
        {props.children}
      </ZoomOut>
    );
  }
  default: {
    return (
      <ScrollAnimation {...props}>
        {props.children}
      </ScrollAnimation>
    );
  }
  }
};

export default Animated;
