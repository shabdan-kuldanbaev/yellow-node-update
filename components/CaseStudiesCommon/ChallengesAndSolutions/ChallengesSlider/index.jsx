import React from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

import styles from '../styles.module.scss';

const params = {
  modules: [Pagination],
  pagination: {
    type: 'bullets',
    clickable: true,
    bulletClass: styles.swiperBullet,
    bulletActiveClass: styles.swiperBulletActive,
  },
};

const ChallengesSlider = ({ isMobileResolution, isSlider, children }) => {
  if (!isMobileResolution || !isSlider) return children;

  return (
    <Swiper {...params}>
      {children.map((child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};

ChallengesSlider.propTypes = {
  isSlider: PropTypes.bool.isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default ChallengesSlider;
