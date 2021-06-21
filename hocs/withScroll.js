import React, {
  useCallback,
  useEffect,
  useRef,
} from 'react';
import throttle from 'lodash/throttle';

export const withScroll = (Component) => (props) => {
  const maxScrollPosition = useRef(0);
  const lastScrollTop = useRef(0);

  const setMaxScrollPosition = (value) => {
    maxScrollPosition.current = value;
  };
  const setLastScrollTop = (value) => {
    lastScrollTop.current = value;
  };
  const saveScrollPosition = useCallback(throttle(
    (scroll) => setMaxScrollPosition(scroll),
    500,
  ), []);
  const saveLastScrollPosition = useCallback(throttle(
    (scroll) => setLastScrollTop(scroll),
    500,
  ), []);

  useEffect(() => {
    const getScrollPercent = () => {
      const { documentElement, body } = document;
      const scrollTop = documentElement.scrollTop || body.scrollTop;
      const scrollHeight = documentElement.scrollHeight || body.scrollHeight;
      const scrollPercent = (
        (
          scrollTop / (scrollHeight - documentElement.clientHeight)
        ) * 100
      ).toFixed(2);

      switch (true) {
      case scrollPercent >= 0 && scrollPercent < 25:
        return 25;
      case scrollPercent >= 25 && scrollPercent < 50:
        return 50;
      case scrollPercent >= 50 && scrollPercent < 75:
        return 75;
      case scrollPercent >= 75 && scrollPercent <= 100:
        return 100;
      default: return 25;
      }
    };

    const setMaxScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > maxScrollPosition.current) {
        const scrollPercent = getScrollPercent();

        if (scrollPercent > maxScrollPosition.current) {
          saveScrollPosition(scrollPercent);
        }
      }

      saveLastScrollPosition(scrollTop <= 0 ? 0 : scrollTop);
    };

    window.addEventListener('scroll', setMaxScroll);

    return () => {
      window.removeEventListener('scroll', setMaxScroll);
    };
  }, []);

  return (
    <Component
      maxScrollPosition={maxScrollPosition}
      lastScrollTop={lastScrollTop}
      {...props}
    />
  );
};
