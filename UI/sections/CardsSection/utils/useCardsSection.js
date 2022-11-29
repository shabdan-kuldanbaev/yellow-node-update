import get from 'lodash/get';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper';
import { selectIsMobileResolutions, selectIsTabletResolutions } from 'redux/selectors/layout';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { PAGES } from 'utils/constants';
import styles from '../CardsSection.module.scss';

const cardMapper = (card) => {
  if (card.sys.contentType.sys.id === 'article') {
    const {
      title,
      previewImageUrl,
      slug,
    } = getDocumentFields(card, [
      'title',
      'previewImageUrl',
      'slug',
    ]);

    const previewUrl = getFileUrl(previewImageUrl);

    return {
      url: `${PAGES.blog}/${slug}`,
      image: previewUrl,
      title,
      children: 'Read More',
    };
  }

  const {
    contentList,
    images,
    contentModules: cardContent,
    description: text,
    ...rest
  } = getDocumentFields(
    card,
    [
      'title',
      'description',
      'contentList',
      'text',
      'images',
      'imagesBundles',
      'contentModules',
    ],
  );
  const image = getFileUrl(get(images, '[0]'));
  const icon = get(contentList, '[0]');
  const url = get(cardContent, '[0].fields.url');

  return {
    url,
    image,
    icon,
    text,
    ...rest,
  };
};

export default ({
  section,
  type,
  withSlider: sectionWithSlider,
}) => {
  const {
    title,
    description,
    subtitle,
    view,
    contentModules,
  } = getDocumentFields(
    section,
    [
      'title',
      'description',
      'contentModules',
      'subtitle',
      'view',
    ],
  );
  const {
    contentModules: rawCardList,
    withoutBackground,
    disableSliderOnMobile,
  } = getDocumentFields(
    get(contentModules, '[0]', []),
    [
      'contentModules',
      'withoutBackground',
      'disableSliderOnMobile',
    ],
  );
  console.log(rawCardList);
  const cardList = (rawCardList || []).map(cardMapper);

  const ctaLink = getDocumentFields(get(contentModules, '[1]'));

  const isTabletResolution = useSelector(selectIsTabletResolutions);
  const isMobileResolution = useSelector(selectIsMobileResolutions);
  const withSlider = sectionWithSlider || (!disableSliderOnMobile && (isTabletResolution || isMobileResolution));

  const swiperProps = {
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: 32,
    centeredSlides: true,
    autoheight: true,
    mousewheel: {
      forceToAxis: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        centeredSlides: false,
      },
      1024: {
        slidesPerView: 3,
        centeredSlides: false,
      },
    },
  };

  const className = cn(
    styles.cardsSection,
    styles[type],
    styles[view],
    {
      [styles.withSlider]: withSlider,
    },
  );

  return {
    withSlider,
    cardList,
    ctaLink,
    title,
    description,
    subtitle,
    className,
    withoutBackground,
    swiperProps,
  };
};
