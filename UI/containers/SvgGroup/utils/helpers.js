import { Autoplay, FreeMode } from 'swiper';

export const getSwiperParams = () => ({
  enabled: true,
  slidesPerView: 'auto',
  spaceBetween: 60,
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
  modules: [Autoplay, FreeMode],
});
