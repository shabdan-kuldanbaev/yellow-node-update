'use client';

import PropTypes from 'prop-types';
import { Swiper } from 'swiper/react';
import { Navigation } from 'swiper';
import { SwiperNavigation } from 'UI/components/SwiperNavigation';
import { useCustomSwiper } from './utils/useCustomSwiper';

const CustomSwiper = (props) => {
  const {
    children,
    swiperParams,
    isShowNavigation,
    navigationClassName,
    className,
    navigationNextRef,
    navigationPrevRef,
    onSwiperInit,
  } = useCustomSwiper(props);

  return (
    <Swiper
      {...swiperParams}
      onInit={isShowNavigation ? onSwiperInit : undefined}
      modules={[
        ...(swiperParams.modules || []),
        Navigation,
      ]}
      className={className}
    >
      {children}
      {isShowNavigation && (
        <SwiperNavigation
          className={navigationClassName}
          navigationPrevRef={navigationPrevRef}
          navigationNextRef={navigationNextRef}
        />
      )}
    </Swiper>
  );
};

SwiperNavigation.propTypes = {
  isShowNavigation: PropTypes.bool,
  navigationClassName: PropTypes.string,
  swiperParams: PropTypes.instanceOf(Object),
  children: PropTypes.arrayOf(PropTypes.node),
};

export default CustomSwiper;
