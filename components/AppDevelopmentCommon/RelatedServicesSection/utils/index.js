import get from 'lodash/get';
import { getDocumentFields } from 'utils/helper';
import { ANIMATED_TYPE } from 'utils/constants';

export const getRelatedServicesProps = (sectionData) => {
  const {
    title,
    description,
    subtitle,
    contentModules,
    view,
  } = getDocumentFields(
    sectionData,
    [
      'title',
      'description',
      'contentModules',
      'subtitle',
      'view',
    ],
  );
  const { contentModules: services } = getDocumentFields(get(contentModules, '[0]', []));
  const animatedProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };
  const link = getDocumentFields(get(contentModules, '[1]'));

  return {
    title,
    description,
    subtitle,
    services,
    link,
    view,
    animatedProps,
  };
};

export const getSwiperParams = () => ({
  effect: 'slide',
  slidesPerView: 1,
  centeredSlides: false,
  spaceBetween: 40,
  loop: false,
  passiveListeners: true,
  mousewheel: {
    forceToAxis: true,
  },
  breakpoints: {
    1024: {
      slidesPerView: 3,
    },
  },
});
