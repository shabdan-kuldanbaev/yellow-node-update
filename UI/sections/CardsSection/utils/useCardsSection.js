import get from 'lodash/get';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { Mousewheel, Navigation } from 'swiper';
import { selectIsMobileResolutions, selectIsTabletResolutions } from 'redux/selectors/layout';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { PAGES } from 'utils/constants';
import Card from 'UI/components/Cards/Card';
import Overlay from 'UI/containers/Overlay';
import styles from '../CardsSection.module.scss';

const cardMapper = (withOverlay) => (card) => {
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
  const image = getFileUrl(get(images, '[0]'));
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
  ...rest
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

  const cardList = (rawCardList || []).map(cardMapper(withOverlay));

  const ctaLink = getDocumentFields(get(contentModules, '[1]'));

  const isTabletResolution = useSelector(selectIsTabletResolutions);
  const isMobileResolution = useSelector(selectIsMobileResolutions);
  const withSlider = sectionWithSlider || (!disableSliderOnMobile && (isTabletResolution || isMobileResolution));

  const swiperProps = {
    modules: [Navigation, Mousewheel],
    slidesPerView: 1,
    spaceBetween: 32,
    centeredSlides: true,
    autoheight: true,
    passiveListeners: true,
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
    withOverlay,
    ...rest,
  };
};
