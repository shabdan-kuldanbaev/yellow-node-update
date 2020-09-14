import React, {
  useRef,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { useIntersection } from 'react-use';

export const CustomAnimation = ({
  children,
  translateX,
  translateY,
  opasityDuration,
  transformDuration,
  transitionDelay,
}) => {
  const [isAnimated, setAnimated] = useState('');
  const animateRef = useRef(null);
  const delayInSeconds = transitionDelay / 1000;
  const intersection = useIntersection(animateRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.2,
  });

  const appearanceStyles = {
    opacity: '1',
    transform: 'translate(0px, 0px)',
    transitionProperty: 'opacity, transform',
    transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1), cubic-bezier(0.165, 0.84, 0.44, 1)',
    transitionDuration: `${opasityDuration}s, ${transformDuration}s`,
    transitionDelay: `${delayInSeconds}s`,
  };

  const generalStyles = {
    opacity: '0',
    transform: `translate(${translateX}, ${translateY})`,
    ...(isAnimated ? appearanceStyles : {}),
  };

  useEffect(() => {
    if (animateRef && animateRef.current) {
      if (intersection && intersection.intersectionRatio >= 0.2) setAnimated(true);
    }
  }, [intersection]);

  // TODO useEffect(() => {
  //   const handleOnScroll = () => {
  //     if (animateRef.current.getBoundingClientRect().top < window.innerHeight && animateRef.current.getBoundingClientRect().bottom > 0) {
  //       setAnimated(true);
  //     }
  //   };

  //   handleOnScroll();
  //   window.addEventListener('scroll', handleOnScroll);
  //   return () => window.removeEventListener('scroll', handleOnScroll);
  // }, []);

  return (
    <div ref={animateRef} style={generalStyles}>
      {children}
    </div>
  );
};

CustomAnimation.defaultProps = {
  translateX: '0',
  translateY: '10px',
  opasityDuration: 0.05,
  transformDuration: 0.1,
  transitionDelay: 500,
};

CustomAnimation.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  translateX: PropTypes.string,
  translateY: PropTypes.string,
  opasityDuration: PropTypes.number,
  transformDuration: PropTypes.number,
  transitionDelay: PropTypes.number,
};
