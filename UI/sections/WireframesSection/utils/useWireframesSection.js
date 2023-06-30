import get from 'lodash/get';
import cn from 'classnames';
import { getFileUrl, getOptimizedContentfulImage } from 'utils/helper';
import styles from '../styles.module.scss';

export const useWireframesSection = ({ data, type }) => {
  const {
    title,
    subtitle,
    description,
    images,
    view,
  } = data;

  const sectionBackgroundImage = getOptimizedContentfulImage(
    getFileUrl(get(data, 'background', {})),
    { fm: 'png' },
  );

  const sectionProps = {
    style: sectionBackgroundImage ? { backgroundImage: `url(${sectionBackgroundImage})` } : {},
    className: cn(
      styles[type],
      styles[view],
      styles.container,
    ),
  };

  return {
    type,
    view,
    title,
    images,
    subtitle,
    description,
    sectionProps,
  };
};
