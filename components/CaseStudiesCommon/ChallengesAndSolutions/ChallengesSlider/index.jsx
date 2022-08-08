import React from 'react';
import PropTypes from 'prop-types';
import { Swiper } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper/core';
import styles from '../styles.module.scss';

SwiperCore.use([Pagination]);

const params = {
  pagination: {
    el: '.swiper-pagination',
    bulletClass: styles.swiperBullet,
    bulletActiveClass: styles.swiperBulletActive,
  },
};

const ChallengesSlider = ({ isMobileResolution, isSlider, children }) => {
  if (!isMobileResolution || !isSlider) return children;

  return <Swiper {...params}>{children}</Swiper>;
};

ChallengesSlider.propTypes = {
  isSlider: PropTypes.bool.isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default ChallengesSlider;
