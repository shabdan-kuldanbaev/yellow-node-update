import { FreeMode } from 'swiper';

export const SELECTOR_SWIPER_PARAMS = {
  enabled: true,
  slidesPerView: 'auto',
  passiveListeners: true,
  freeMode: true,
  mousewheel: {
    forceToAxis: true,
  },
  rewind: true,
  autoplay: {
    delay: 800,
    disableOnInteraction: false,
  },
  speed: 500,
  spaceBetween: 24,
  modules: [FreeMode],
  loop: true,
  breakpoints: {
    768: {
      spaceBetween: 48,
    },
  },
};
