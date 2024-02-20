/* eslint-disable react/button-has-type */
import {
  useState,
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { useIntersection } from 'react-use';
import Lottie from 'react-lottie-light';

export const JSONAnimation = ({ jsonFile, className }) => {
  const [state, setState] = useState({ isStopped: false, isPaused: false });
  const animateRef = useRef(null);
  const intersection = useIntersection(animateRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.2,
  });
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: jsonFile,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  useEffect(() => {
    if (animateRef && animateRef.current) {
      if (intersection && intersection.intersectionRatio < 0.2) {
        setState({ ...state, isPaused: true });
      } else {
        setState({ ...state, isPaused: false });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intersection]);

  return (
    <div
      ref={animateRef}
      className={className}
    >
      <Lottie
        options={defaultOptions}
        isStopped={state.isStopped}
        isPaused={state.isPaused}
      />
    </div>
  );
};

JSONAnimation.propTypes = {
  jsonFile: PropTypes.instanceOf(Object).isRequired,
  className: PropTypes.string,
};
