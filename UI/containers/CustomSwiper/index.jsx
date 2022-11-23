import React from 'react';
import PropTypes from 'prop-types';
import { Swiper } from 'swiper/react';
import { SwiperNavigation } from 'UI/components/SwiperNavigation';

const CustomSwiper = ({
  children,
  swiperParams,
  isShowNavigation,
  navigationClassName,
}) => (
  <Swiper {...swiperParams}>
    {children}
    {isShowNavigation && (
      <SwiperNavigation className={navigationClassName} />
    )}
  </Swiper>
);

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
