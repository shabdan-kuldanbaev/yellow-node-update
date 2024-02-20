import cn from 'classnames';
import PropTypes from 'prop-types';
import { SwiperSlide } from 'swiper/react';
import CustomSwiper from 'UI/containers/CustomSwiper';
import { useChallengesSlider } from './utils/useChallengesSlider';
import styles from './styles.module.scss';

const ChallengesSlider = (props) => {
  const {
    type,
    isMobileResolution,
    isSlider,
    children,
    isSpecialSwiper,
    swiperParams,
  } = useChallengesSlider(props);

  if (!isMobileResolution || !isSlider) return children;

  return (
    <CustomSwiper
      className={cn(styles.swiper, styles[type])}
      swiperParams={swiperParams}
      isShowNavigation={isSpecialSwiper}
      navigationClassName={styles.navigation}
    >
      {children.map((child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </CustomSwiper>
  );
};

ChallengesSlider.propTypes = {
  isSlider: PropTypes.bool.isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  type: PropTypes.string.isRequired,
  componentType: PropTypes.string.isRequired,
  isMobileResolution: PropTypes.bool,
};

export default ChallengesSlider;
