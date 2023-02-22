import { useRef, useEffect } from 'react';
import logoAnimation from '../json/logo-animation.json';

export const useLoadingScreen = ({
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
  }, [
    isFirstPageLoaded,
    isPageReadyToDisplay,
    setPageLoaded,
  ]);

  return {
    loadRef,
    defaultOptions,
  };
};
