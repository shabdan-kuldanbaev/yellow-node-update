import React from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { SwiperNavigation } from 'components/SwiperNavigation';
import { SWIPER_PARAMS } from './utils';
import styles from './styles.module.scss';

const CardsSlider = ({
  type,
  isMobileResolution,
  children,
}) => {
  if (!isMobileResolution) return children;

  return (
    <Swiper {...SWIPER_PARAMS[type]}>
      {children.map((child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
      <SwiperNavigation className={styles.navigation} />
    </Swiper>
  );
};

CardsSlider.propTypes = {
  isMobileResolution: PropTypes.bool.isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default CardsSlider;
