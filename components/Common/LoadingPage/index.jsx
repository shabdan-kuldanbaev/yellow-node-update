import React, {
  useState, useRef, useEffect, Fragment,
} from 'react';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import logo_animation from './json/logo-animation.json';
import styles from './styles.module.scss';

export const LoadingPage = ({ isLoading, handleOnAnimationComplete }) => {
  const [state, setState] = useState({ isStopped: false, isPaused: false });
  const loadRef = useRef(null);
  const isPageLoading = useRef(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: logo_animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const handleOnComplete = () => {
    if (isPageLoading.current) {
      setState({ ...state, isStopped: false });
    } else {
      setState({ ...state, isStopped: true });
      loadRef.current && loadRef.current.classList.add(styles.hide);
      loadRef.current && loadRef.current.classList.add(styles.setZIndex);
      handleOnAnimationComplete();
    }
  };

  const eventListeners = [
    {
      eventName: 'loopComplete',
      callback: () => handleOnComplete(),
    },
  ];

  useEffect(() => {
    isPageLoading.current = isLoading;
  }, [isLoading]);

  return (
    <div className={styles.loadingPage} ref={loadRef}>
      <div className={styles.jsonWrapper}>
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
