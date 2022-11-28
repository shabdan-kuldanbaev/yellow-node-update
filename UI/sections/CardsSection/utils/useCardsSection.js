import get from 'lodash/get';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { selectIsTabletResolutions } from 'redux/selectors/layout';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import styles from '../CardsSection.module.scss';

export default ({
  sectionData,
  type,
}) => {
  const {
    title,
    description,
    subtitle,
    view,
    contentModules,
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
  const { contentModules: rawCardList } = getDocumentFields(get(contentModules, '[0]', []));
  const cardList = (rawCardList || []).map((card) => {
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
  });

  const ctaLink = getDocumentFields(get(contentModules, '[1]'));

  const isTabletResolution = useSelector(selectIsTabletResolutions);
  const withSlider = !isTabletResolution;

  console.log({ type });
  const className = cn(styles.cardsSection, styles[type], styles[view]);

  return {
    withoutSlider: withSlider,
    cardList,
    ctaLink,
    title,
    description,
    subtitle,
    className,
  };
};
