import styles from './styles.module.scss';

export const SWIPER_CONFIG = {
  containerClass: styles.container,
  slidesPerView: 'auto',
  passiveListeners: true,
  speed: 500,
  mousewheel: {
    forceToAxis: true,
  },
};
