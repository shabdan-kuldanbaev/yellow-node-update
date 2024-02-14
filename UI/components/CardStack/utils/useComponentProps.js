import { useState, useEffect } from 'react';
import { useSprings } from 'react-spring';

const config = {
  tension: 120,
  friction: 14,
};

const setter = (currentIndex, length, isMobile) => (index) => ({
  x: index === currentIndex || isMobile ? 0 : 48,
  scale: index === currentIndex || isMobile ? 1 : 0.9,
  zIndex: index === currentIndex ? length + 1 : 1,
  immediate: (key) => key === 'zIndex',
  config,
});

export default ({
  data,
  ...rest
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [springs, setSprings] = useSprings(
    data?.length || 0,
    setter(
      currentIndex,
      data?.length || 0,
      isMobile,
    ),
  );

  const handleOnNextClick = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, data.length - 1));
  };

  const handleOnPrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  useEffect(() => setIsMobile(window.innerWidth <= 768), []);

  useEffect(() => {
    setSprings(setter(currentIndex, data?.length || 0, isMobile));
  }, [
    isMobile,
    currentIndex,
    setSprings,
    data,
  ]);

  return {
    data,
    currentIndex,
    springs,
    handleOnNextClick,
    handleOnPrevClick,
    isMobile,
    ...rest,
  };
};
