import React from 'react';
import PropTypes from 'prop-types';
import { Swiper } from 'swiper/react';
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

SwiperNavigation.defaultProps = {
  isShowNavigation: false,
  navigationClassName: null,
};

SwiperNavigation.propTypes = {
  isShowNavigation: PropTypes.bool,
  navigationClassName: PropTypes.string,
  swiperParams: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default CustomSwiper;
