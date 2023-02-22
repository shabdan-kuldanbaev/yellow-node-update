import get from 'lodash/get';
import cn from 'classnames';
import { getFileUrl } from 'utils/helper';
import styles from '../styles.module.scss';

export default ({ data, type }) => {
  const {
    images,
    ...rest
  } = data;

  const imageUrl = getFileUrl(get(images, '[0]', {}));
  const className = cn(styles[type], styles.parallaxSection);

  return {
    imageUrl,
    className,
    ...rest,
  };
};
