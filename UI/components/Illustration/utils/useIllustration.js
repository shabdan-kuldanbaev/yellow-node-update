import cn from 'classnames';
import { getContentfulImage } from './helpers';
import styles from '../styles.module.scss';

export default ({
  src,
  isStatic,
  className: classnames,
  lazyBoundary = '700px',
  apiParams,
  transparent,
  placeholder: placeholderProp,
  ...rest
}) => {
  const loader = isStatic
    ? ({ src: staticSrc }) => staticSrc
    : (args) => getContentfulImage({ transparent, ...args, ...apiParams });

  const className = cn(styles.image, classnames);

  const placeholder = placeholderProp || (transparent ? 'blur' : 'empty');

  const blurDataURL = isStatic
    ? src
    : getContentfulImage({
      src,
      quality: 1,
      format: 'webp',
      transparent,
    });

  return {
    src,
    loader,
    blurDataURL,
    className,
    lazyBoundary,
    placeholder,
    ...rest,
  };
};
