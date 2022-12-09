import { useRef } from 'react';

export const useCustomSwiper = ({
  children,
  swiperParams,
  isShowNavigation,
  navigationClassName,
  className,
}) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const onSwiperInit = (swiper) => {
    swiper.params.navigation.prevEl = navigationPrevRef.current;
    swiper.params.navigation.nextEl = navigationNextRef.current;
    swiper.navigation.init();
    swiper.navigation.update();
  };

  return {
    children,
    swiperParams,
    isShowNavigation,
    navigationClassName,
    className,
    navigationPrevRef,
    navigationNextRef,
    onSwiperInit,
  };
};
