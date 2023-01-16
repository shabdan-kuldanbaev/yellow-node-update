import React from 'react';
import PropTypes from 'prop-types';
import { SwiperSlide } from 'swiper/react';
import CustomSwiper from 'UI/containers/CustomSwiper';
import { CASE_STUDIES_TYPES } from 'utils/constants';
import { getSwiperParams } from './utils/challengesSliderHelper';
import styles from '../styles.module.scss';

const ChallengesSlider = ({
  isMobileResolution,
  isSlider,
  type,
  children,
}) => {
  if (!isMobileResolution || !isSlider) return children;

  const isSpecialSwiper = type === CASE_STUDIES_TYPES.challengesSpecialSlider;
  const swiperParams = getSwiperParams(type);

  return (
    <CustomSwiper
      {...swiperParams}
      isShowNavigation={isSpecialSwiper}
      navigationClassName={styles.navigation}
    >
      {children.map((child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </CustomSwiper>
  );
};

ChallengesSlider.defaultProps = {
  isMobileResolution: false,
};

ChallengesSlider.propTypes = {
  isSlider: PropTypes.bool.isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  type: PropTypes.string.isRequired,
  isMobileResolution: PropTypes.bool,
};

export default ChallengesSlider;
