import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import { connect } from 'react-redux';
import { setFirstPageLoaded } from 'redux/actions/layout';
import { selectIsPageReadyToDisplay, selectIsFirstPageLoaded } from 'redux/selectors/layout';
import logoAnimation from './json/logo-animation.json';
import styles from './styles.module.scss';

const LoadingScreen = ({
  isPageReadyToDisplay,
  isFirstPageLoaded,
  setFirstPageLoaded: setPageLoaded,
}) => {
  const loadRef = useRef(null);
  const isPageLoading = useRef(false);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: logoAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  useEffect(() => {
    isPageLoading.current = !isPageReadyToDisplay;

    return () => !isFirstPageLoaded && setPageLoaded(true);
  }, [isPageReadyToDisplay]);

  return (
    <div ref={loadRef} className={styles.loadingPage}>
      <div className={styles.jsonWrapper}>
        <Lottie options={defaultOptions} speed={1} />
      </div>
    </div>
  );
};

LoadingScreen.propTypes = {
  isPageReadyToDisplay: PropTypes.bool.isRequired,
  isFirstPageLoaded: PropTypes.bool.isRequired,
  setFirstPageLoaded: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    isPageReadyToDisplay: selectIsPageReadyToDisplay(state),
    isFirstPageLoaded: selectIsFirstPageLoaded(state),
  }),
  { setFirstPageLoaded },
)(LoadingScreen);
