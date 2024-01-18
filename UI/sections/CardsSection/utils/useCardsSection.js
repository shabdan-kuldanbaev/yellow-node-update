import get from 'lodash/get';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { Mousewheel, Navigation } from 'swiper';
import {
  selectIsDesktop,
  selectIsMobile,
  selectIsTablet,
} from 'redux/selectors/layout';
import { getDocumentFields, getImage } from 'utils/helper';
import { CASE_STUDIES, PAGES } from 'utils/constants';
import Card from 'UI/components/Cards/Card';
import Overlay from 'UI/containers/Overlay';
import { routes } from 'utils/routes';
import styles from '../CardsSection.module.scss';

const SLIDES_PER_VIEW = {
  [routes.bookCall.slug]: {
    thirdSectionView: 'auto',
    fourthSectionView: 'auto',
  },
};

const SPACE_BETWEEN = {
  [routes.bookCall.slug]: {
    thirdSectionView: 66,
    fourthSectionView: 43,
  },

  [CASE_STUDIES.digitalWallet]: {
    firstSectionView: 16,
  },
};

const REWIND = {
  [routes.bookCall.slug]: {
    firstSectionView: true,
    secondSectionView: true,
    thirdSectionView: true,
  },
};

const cardMapper = (withOverlay) => (card) => {
  if (card?.sys?.contentType?.sys?.id === 'article') {
    const {
      title,
      previewImageUrl,
      slug,
    } = getDocumentFields(card, [
      'title',
      'previewImageUrl',
      'slug',
    ]);

    const image = getImage(previewImageUrl);

    return {
      url: `${PAGES.blog}/${slug}`,
      image,
      title,
      children: <span>Read more</span>,
    };
  }

  const {
    contentList,
    images,
    contentModules: cardContent,
    text,
    title,
    ...rest
  } = getDocumentFields(
    card,
    [
      'title',
      'contentList',
      'text',
      'images',
      'imagesBundles',
      'contentModules',
    ],
  );
  const image = getImage(get(images, '[0]'));
  const icon = get(contentList, '[0]');
  const url = get(cardContent, '[0].fields.url');

  const children = (
    <Overlay className={styles.overlay}>
      <Card
        title={title}
        text={text}
      />
    </Overlay>
  );

  return {
    url,
    image,
    icon,
    text,
    title,
    children,
    ...rest,
  };
};

export default ({
  section,
  type,
  withSlider: sectionWithSlider,
  withOverlay,
  data,
  ...rest
}) => {
  const {
    title,
    description,
    subtitle,
    view,
    contentModules,
    images: rawImages,
  } = getDocumentFields(
    data || section,
    [
      'title',
      'description',
      'contentModules',
      'subtitle',
      'view',
      'images',
    ],
    {
      isNormilized: (data && !Object.keys(data).includes('fields'))
      || (section && !Object.keys(section).includes('fields')),
    },
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

  const images = (rawImages || []).map((rawImage) => getImage(rawImage));

  const cardList = (rawCardList || []).map(cardMapper(withOverlay));

  const ctaLink = get(contentModules, '[1]');

  const isMobileResolution = useSelector(selectIsMobile);
  const isTabletResolution = useSelector(selectIsTablet);
  const IsFullResolution = useSelector(selectIsDesktop);

  const withSlider = sectionWithSlider || (!disableSliderOnMobile && (isTabletResolution || isMobileResolution));
  const isShowNavigation = !(IsFullResolution && cardList?.length <= 3);

  const swiperProps = {
    modules: [Navigation, Mousewheel],
    slidesPerView: 1,
    spaceBetween: SPACE_BETWEEN[type]?.[view] || 32,
    centeredSlides: true,
    autoHeight: false,
    passiveListeners: true,
    rewind: REWIND[type]?.[view] || false,
    mousewheel: {
      forceToAxis: true,
    },
    breakpoints: {
      768: {
        slidesPerView: SLIDES_PER_VIEW[type]?.[view] || 2,
        centeredSlides: false,
      },
      1024: {
        slidesPerView: SLIDES_PER_VIEW[type]?.[view] || 3,
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
    type,
    view,
    withSlider,
    cardList,
    ctaLink,
    title,
    description,
    subtitle,
    className,
    withoutBackground,
    swiperProps,
    withOverlay,
    isShowNavigation,
    images,
    ...rest,
  };
};
