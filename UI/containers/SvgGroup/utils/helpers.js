import { FreeMode } from 'swiper';

export const SWIPER_PARAMS = {
  enabled: true,
  slidesPerView: 'auto',
  spaceBetween: 60,
  passiveListeners: true,
  freeMode: true,
  mousewheel: {
    forceToAxis: true,
  },
  rewind: true,
  speed: 500,
  modules: [FreeMode],
};
