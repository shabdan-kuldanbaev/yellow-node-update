import { FreeMode } from 'swiper';

const DEFAULT_SPACE_BETWEEN = 60;

const SPACE_BETWEEN_PAGES = {
  'software-quality-assurance-services': 45,
  homepage: {
    firstSectionView: 109,
  },
};

const SWIPER_PARAMS = {
  enabled: true,
  slidesPerView: 'auto',
  passiveListeners: true,
  freeMode: true,
  mousewheel: {
    forceToAxis: true,
  },
  rewind: true,
  speed: 500,
  modules: [FreeMode],
};

export const getSwiperParams = (slug, view) => ({
  ...SWIPER_PARAMS,
  spaceBetween:
    (SPACE_BETWEEN_PAGES[slug] && SPACE_BETWEEN_PAGES[slug][view])
    || (!isNaN(SPACE_BETWEEN_PAGES[slug]) && SPACE_BETWEEN_PAGES[slug])
    || DEFAULT_SPACE_BETWEEN,
});
