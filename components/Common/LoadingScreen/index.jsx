import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import { connect } from 'react-redux';
import { setLoadingScreenCompleted, setFirstPageLoaded } from 'redux/actions/layout';
import { selectIsPageReadyToDisplay, selectIsFirstPageLoaded } from 'redux/selectors/layout';
import logo_animation from './json/logo-animation.json';
import styles from './styles.module.scss';

const LoadingScreen = ({
  isPageReadyToDisplay,
  isFirstPageLoaded,
  setLoadingScreenCompleted,
  setFirstPageLoaded,
}) => {
  const [{ isStopped, isPaused }, setState] = useState({ isStopped: false, isPaused: false });
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
  const eventListeners = [{
    eventName: 'loopComplete',
    callback: () => {
      if (isPageLoading.current) {
        setState({ isStopped: false });
      } else {
        setState({ isStopped: true });
        loadRef.current && loadRef.current.classList.add(styles.hide);
        loadRef.current && loadRef.current.classList.add(styles.setZIndex);
        setLoadingScreenCompleted(true);
      }
    },
  }];

  useEffect(() => {
    isPageLoading.current = isPageReadyToDisplay;

    return () => !isFirstPageLoaded && setFirstPageLoaded(true);
  }, [isPageReadyToDisplay]);

  return (
    <div ref={loadRef} className={styles.loadingPage}>
      <div className={styles.jsonWrapper}>
        <Lottie
          options={defaultOptions}
          isStopped={isStopped}
          isPaused={isPaused}
          eventListeners={eventListeners}
          speed={1.7}
        />
      </div>
    </div>
  );
};

LoadingScreen.propTypes = {
  isPageReadyToDisplay: PropTypes.bool.isRequired,
  isFirstPageLoaded: PropTypes.bool.isRequired,
  setLoadingScreenCompleted: PropTypes.func.isRequired,
  setFirstPageLoaded: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    isPageReadyToDisplay: selectIsPageReadyToDisplay(state),
    isFirstPageLoaded: selectIsFirstPageLoaded(state),
  }),
  { setLoadingScreenCompleted, setFirstPageLoaded },
)(LoadingScreen);
