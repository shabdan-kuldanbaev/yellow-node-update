import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import { connect } from 'react-redux';
import { setIsLoadingScreenCompleted } from 'redux/actions/layout';
import { selectIsPageReadyToDisplay } from 'redux/selectors/layout';
import logo_animation from './json/logo-animation.json';
import styles from './styles.module.scss';

const LoadingScreen = ({ IsPageReadyToDisplay, setIsLoadingScreenCompleted }) => {
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
        setIsLoadingScreenCompleted(true);
      }
    },
  }];

  useEffect(() => {
    isPageLoading.current = IsPageReadyToDisplay;
  }, [IsPageReadyToDisplay]);

  return (
    <div ref={loadRef} className={styles.loadingPage}>
      <div className={styles.jsonWrapper}>
        <Lottie
          options={defaultOptions}
          isStopped={isStopped}
          isPaused={isPaused}
          eventListeners={eventListeners}
        />
      </div>
    </div>
  );
};

LoadingScreen.propTypes = {
  IsPageReadyToDisplay: PropTypes.bool.isRequired,
  setIsLoadingScreenCompleted: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({ IsPageReadyToDisplay: selectIsPageReadyToDisplay(state) }),
  { setIsLoadingScreenCompleted },
)(LoadingScreen);
