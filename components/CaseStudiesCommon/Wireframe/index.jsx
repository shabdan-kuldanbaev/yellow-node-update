import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Swiper from 'react-id-swiper';
import SwiperCors, { Autoplay } from 'swiper';
import { Animated } from 'components/Common/Animated';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

SwiperCors.use([Autoplay]);

const Wireframe = ({ imageUrl, type, direction }) => {
  const params = {
    loop: true,
    autoplay: {
      delay: 1,
    },
    rtl: direction,
    freeMode: true,
    breakpoints: {
      300: {
        speed: 20000,
        spaceBetween: 20,
      },
      569: {
        speed: 10000,
        spaceBetween: 80,
      },
    },
  };

  return (
    <Animated
      type={ANIMATED_TYPE.isFade}
      delay={500}
      duration={1000}
    >
      <div className={cn(styles.container, styles[type])}>
        <div className={styles.swiper}>
          <Swiper
            {...params}
          >
            <img
              src={imageUrl}
              className={cn(styles.image, 'swiper-no-swiping')}
              alt=""
            />
          </Swiper>
        </div>
      </div>
    </Animated>
  );
};

Wireframe.defaultProps = {
  direction: false,
};

Wireframe.prototype = {
  imageUrl: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  direction: PropTypes.bool,
};

export default Wireframe;
