import cn from 'classnames';
import get from 'lodash/get';
import { getDocumentFields, getImage } from 'utils/helper';
import styles from '../styles.module.scss';

export const useImageSection = ({ data, type }) => {
  const {
    title,
    subtitle,
    description,
    contentModules,
    background,
  } = data;

  const { imagesBundles } = getDocumentFields(get(data, 'contentModules[0]'), ['imagesBundles']);
  const imagesUrl = imagesBundles?.map((image) => getImage(image));
  const backgroundImage = background && getImage(background);
  const { text } = getDocumentFields(get(contentModules, '[0]', {}), ['text']);

  const sectionTitles = {
    type,
    title,
    subtitle,
    description,
    titleStyle: styles.titleStyle,
  };

  const sectionProps = {
    className: cn(styles[type], styles[data.view], styles.section),
    style: backgroundImage ? { backgroundImage: `url(${backgroundImage.url})` } : {},
  };

  return {
    sectionTitles,
    type,
    data,
    imagesUrl,
    text,
    sectionProps,
  };
};
