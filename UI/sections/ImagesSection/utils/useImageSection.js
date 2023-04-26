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
  } = data;

  const { imagesBundles } = getDocumentFields(get(data, 'contentModules[0]'), ['imagesBundles']);
  const imagesUrl = imagesBundles?.map((image) => getImage(image));
  const { text } = getDocumentFields(get(contentModules, '[0]', {}), ['text']);
  const classname = cn(styles[type], styles[data.view], styles.section);
  const sectionTitles = {
    type,
    title,
    subtitle,
    description,
    titleStyle: styles.titleStyle,
  };

  return {
    sectionTitles,
    type,
    data,
    imagesUrl,
    text,
    classname,
  };
};
