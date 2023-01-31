import get from 'lodash/get';
import cn from 'classnames';
import { getFileUrl } from 'utils/helper';
import styles from '../styles.module.scss';

export default ({ data, type }) => {
  const { title, subtitle } = data;
  const imageUrl = getFileUrl(get(data.images, '[0]', {}));
  const className = cn(styles[type], styles.parallaxSection);

  return {
    title,
    subtitle,
    imageUrl,
    className,
  };
};
