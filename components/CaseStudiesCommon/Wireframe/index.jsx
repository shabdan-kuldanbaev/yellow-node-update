import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Swiper from 'react-id-swiper';
import SwiperCors, { Autoplay } from 'swiper';
import { Animated } from 'components/Common/Animated';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

SwiperCors.use([Autoplay]);

const Wireframe = ({ imageUrl, type }) => {
  const params = {
    loop: true,
    autoplay: {
      delay: 1,
    },
    freeMode: true,
    spaceBetween: 80,
    speed: 10000,
  };

  return (
    <Animated
      type={ANIMATED_TYPE.isFade}
      delay={500}
      duration={1000}
    >
      <div className={cn(styles.container, styles[type])}>
        <Swiper {...params}>
          <img
            src={imageUrl}
            className={styles.image}
            alt=""
          />
        </Swiper>
      </div>
    </Animated>
  );
};

Wireframe.prototype = {
  imageUrl: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Wireframe;

// <Animated
//   type={ANIMATED_TYPE.isFade}
//   delay={500}
//   duration={1000}
// >
//   <div className={cn(styles.imagesContainer, styles[type])}>
//     <Swiper {...params}>
//       <div>Slide #1</div>
//       <div>Slide #2</div>
//       <div>Slide #3</div>
//       <div>Slide #4</div>
//       <div>Slide #5</div>
//     </Swiper>
//   </div>
// </Animated>
