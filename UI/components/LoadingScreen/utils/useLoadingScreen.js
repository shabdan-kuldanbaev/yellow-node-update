'use client';

import { useRef, useEffect } from 'react';
import { firstPageLoaded } from 'store/reducers/layout';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsFirstPageLoaded, selectIsPageReadyToDisplay } from 'store/selectors/layout';
import logoAnimation from '../json/logo-animation.json';

export const useLoadingScreen = () => {
  const isPageReadyToDisplay = useSelector(selectIsPageReadyToDisplay);
  const isFirstPageLoaded = useSelector(selectIsFirstPageLoaded);

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
