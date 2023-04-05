import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { SwiperNavigation } from 'UI/components/SwiperNavigation';
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
    <Swiper {...swiperParams}>
      {children.map((child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
      {isSpecialSwiper && <SwiperNavigation className={styles.navigation} />}
    </Swiper>
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
