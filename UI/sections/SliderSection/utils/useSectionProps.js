import { get } from 'lodash';
import { useSelector } from 'react-redux';
import { selectIsDesktop } from 'redux/selectors/layout';
import { getDocumentFields } from 'utils/helper';
import { typesDependencies } from './helpers';

export default (props) => {
  const {
    sectionData,
    type,
    handleOnCTAClick,
  } = props;

  const {
    title,
    subtitle,
    description,
    contentModules,
  } = getDocumentFields(
    sectionData,
    [
      'title',
      'subtitle',
      'description',
      'contentModules',
    ],
  );

  const isDesktop = useSelector(selectIsDesktop);
  const disabledOnDesktop = typesDependencies(type) && isDesktop;

  const ctaLink = get(contentModules, '[1]');

  const slides = getDocumentFields(get(contentModules, '[0]', []), ['contentModules'])
    .contentModules.map((slide) => {
      const {
        title: slideTitle,
        description: slideDescription,
        text,
      } = getDocumentFields(
        slide,
        [
          'title',
          'description',
          'text',
        ],
      );

      return {
        slideTitle,
        slideDescription,
        text,
      };
    });

  const params = {
    slidesPerView: 1,
    spaceBetween: 32,
    slidesPerGroup: 1,
    mousewheel: {
      forceToAxis: true,
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    breakpoints: {
      1025: {
        slidesPerGroup: 2,
        slidesPerView: 2,
      },
    },
  };

  return {
    title,
    subtitle,
    description,
    slides,
    params,
    ctaLink,
    type,
    handleOnCTAClick,
    disabledOnDesktop,
  };
};
