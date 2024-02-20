import cn from 'classnames';
import { getContentfulImage } from './helpers';
import styles from '../styles.module.scss';

export default ({
  src,
  isStatic,
  priority,
  className: classnames,
  placeholder: placeholderProp,
  lazyBoundary = '700px',
  apiParams = {},
  transparent = false,
  alt = '',
  ...rest
}) => {
  const loader = isStatic
    ? ({ src: staticSrc }) => staticSrc
    : (args) => getContentfulImage({ transparent, ...args, ...apiParams });

  const className = cn(styles.image, classnames);

  const lazyProps = !priority ? {
    placeholder: placeholderProp || (transparent ? 'blur' : 'empty'),
    blurDataURL: getContentfulImage({
      src,
      quality: 1,
      format: 'webp',
      transparent,
    }),
  } : {};

  return {
    src,
    loader,
    className,
    lazyBoundary,
    priority,
    alt,
    ...lazyProps,
    ...rest,
  };
};
