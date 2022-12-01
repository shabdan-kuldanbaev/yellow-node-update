import cn from 'classnames';
import { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [blurDataURL, setBlurDataURL] = useState();

  const loader = isStatic
    ? ({ src: staticSrc }) => staticSrc
    : (args) => getContentfulImage({ transparent, ...args, ...apiParams });

  const className = cn(styles.image, classnames);

  const placeholder = placeholderProp || (transparent ? 'blur' : 'empty');

  useEffect(() => {
    if (isStatic || !transparent) {
      return;
    }

    (async () => {
      const base64 = await axios.post('/api/getBase64', { url: src });
      setBlurDataURL(base64);
    })();
  }, [src, isStatic, transparent]);

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
