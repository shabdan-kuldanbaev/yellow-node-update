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
    speed: 30000,
    breakpoints: {
      300: {
        spaceBetween: 50,
      },
      569: {
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
  direction: '',
};

Wireframe.prototype = {
  imageUrl: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  direction: PropTypes.string,
};

export default Wireframe;
