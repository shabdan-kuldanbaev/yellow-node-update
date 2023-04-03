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
  priority,
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
    src: getContentfulImage({
      src,
      quality: 100,
      transparent,
    }).href,
    loader,
    className,
    lazyBoundary,
    priority,
    ...lazyProps,
    ...rest,
  };
};
