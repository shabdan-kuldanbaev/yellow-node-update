import {
  useState,
  useEffect,
  useRef,
} from 'react';

function useAppearingAnimation(isDesktopOnly = false, isMobileResolution = false) {
  const oldYRef = useRef(0);
  const [direction, setDirection] = useState('');
  const [isTopOfPage, setTopOfPage] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    oldYRef.current = window.pageYOffset;

    const handleOnScroll = () => {
      const { pageYOffset } = window;

      if (pageYOffset < 250) {
        setTopOfPage(true);

        if (!isDesktopOnly || !isMobileResolution) {
          if (pageYOffset < 200 && oldYRef.current > pageYOffset) {
            setDirection('up');
          }

          if (pageYOffset > 100 && oldYRef.current < pageYOffset) {
            setDirection('down');
          }
        }
      } else {
        setTopOfPage(false);
      }

      oldYRef.current = pageYOffset;
    };

    handleOnScroll();

    window.addEventListener('scroll', handleOnScroll);

    return () => window.removeEventListener('scroll', handleOnScroll);
  }, []);

  return [direction, isTopOfPage];
}

export default useAppearingAnimation;
