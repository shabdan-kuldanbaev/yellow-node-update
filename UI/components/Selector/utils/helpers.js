import { FreeMode } from 'swiper';

const SPACE_BETWEEN_LIST = {
  'lending-software-development': 40,
};

const SPACE_BETWEEN_DEFAULT = 80;

const SWIPER_PARAMS = {
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
  modules: [FreeMode],
};

export const getSwiperParams = (type) => {
  const spaceBetween = SPACE_BETWEEN_LIST[type] || SPACE_BETWEEN_DEFAULT;

  return {
    ...SWIPER_PARAMS,
    spaceBetween,
  };
};
