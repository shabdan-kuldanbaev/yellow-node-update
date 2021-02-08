import React, {
  useState, useRef, useEffect, Fragment,
} from 'react';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import logo_animation from './json/logo_animation.json';
import styles from './styles.module.scss';

export const LoadingPage = ({ isLoading, children }) => {
  const [state, setState] = useState({ isStopped: false, isPaused: false });
  const animateRef = useRef(null);
  const loadRef = useRef(null);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: logo_animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  useEffect(() => {
    if (isLoading && state.isStopped) {
      setState({ ...state, isStopped: false });
      loadRef.current && loadRef.current.classList.remove(styles.hide);
      loadRef.current && loadRef.current.classList.remove(styles.setZIndex);
    }
  }, [isLoading]);

  const eventListeners = [
    {
      eventName: 'loopComplete',
      callback: () => {
        if (isLoading) {
          setState({ ...state, isStopped: false });
        } else {
          setState({ ...state, isStopped: true });
          loadRef.current && loadRef.current.classList.add(styles.hide);
          loadRef.current && loadRef.current.classList.add(styles.setZIndex);
        }
      },
    },
  ];

  return (
    <div className={styles.loadingPage} ref={loadRef}>
      <div ref={animateRef} className={styles.jsonWrapper}>
        <Lottie
          options={defaultOptions}
          isStopped={state.isStopped}
          isPaused={state.isPaused}
          eventListeners={eventListeners}
        />
      </div>
    </div>
  );
};
