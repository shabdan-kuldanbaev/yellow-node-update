import { useRef, useEffect } from 'react';
import { firstPageLoaded } from 'redux/reducers/layout';
import { useDispatch } from 'react-redux';
import logoAnimation from '../json/logo-animation.json';

export const useLoadingScreen = ({
  isPageReadyToDisplay,
  isFirstPageLoaded,
}) => {
  const dispatch = useDispatch();
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
    // TODO: Smth weird
    isPageLoading.current = !isPageReadyToDisplay;

    return () => !isFirstPageLoaded && dispatch(firstPageLoaded(true));
  }, [
    dispatch,
    isFirstPageLoaded,
    isPageReadyToDisplay,
  ]);

  return {
    loadRef,
    defaultOptions,
  };
};
