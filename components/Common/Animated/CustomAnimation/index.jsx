import React, {
  useRef,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';

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
    transform: `translate(${translateX}px, ${translateY}px)`,
    ...(isAnimated ? appearanceStyles : {}),
  };

  useEffect(() => {
    const handleOnScroll = () => {
      if (animateRef.current.getBoundingClientRect().top < window.innerHeight && animateRef.current.getBoundingClientRect().bottom > 0) {
        setAnimated(true);
      }
    };

    handleOnScroll();
    window.addEventListener('scroll', handleOnScroll);
    return () => window.removeEventListener('scroll', handleOnScroll);
  }, []);

  return (
    <div ref={animateRef} style={generalStyles}>
      {children}
    </div>
  );
};

CustomAnimation.defaultProps = {
  translateX: 0,
  translateY: 10,
  opasityDuration: 0.05,
  transformDuration: 0.1,
  transitionDelay: 500,
};

CustomAnimation.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  translateX: PropTypes.number,
  translateY: PropTypes.number,
  opasityDuration: PropTypes.number,
  transformDuration: PropTypes.number,
  transitionDelay: PropTypes.number,
};
