import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { SwiperNavigation } from 'UI/components/SwiperNavigation';
import styles from '../styles.module.scss';

const ProcessSlider = ({
  isMobileResolution,
  type,
  children,
}) => {
  if (!isMobileResolution) return children;

  const swiperParams = {
    modules: [Pagination],
    slidesPerView: 1,
    spaceBetween: 30,
  };

  return (
    <Swiper {...swiperParams}>
      {children.map((child, index) => <SwiperSlide key={index}>{child}</SwiperSlide>)}
      <SwiperNavigation className={styles.navigation} />
    </Swiper>
  );
};

ProcessSlider.propTypes = {
  isSlider: PropTypes.bool.isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  type: PropTypes.string.isRequired,
};

export default ProcessSlider;
