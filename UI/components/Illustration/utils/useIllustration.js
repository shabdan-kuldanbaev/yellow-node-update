import cn from 'classnames';
import { getContentfulImage } from './helpers';
import styles from '../styles.module.scss';

export default ({
  src,
  isStatic,
  className: classnames,
  apiParams,
  ...rest
}) => {
  const loader = isStatic
    ? ({ src: staticSrc }) => staticSrc
    : (args) => getContentfulImage({ ...args, ...apiParams });

  const blurDataURL = isStatic
    ? src
    : getContentfulImage({
      src,
      quality: 1,
      progressive: true,
      ...apiParams,
    });

  const className = cn(styles.image, classnames);

  return {
    src,
    loader,
    blurDataURL,
    className,
    ...rest,
  };
};
