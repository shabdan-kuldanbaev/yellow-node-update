import get from 'lodash/get';
import cn from 'classnames';
import { getFileUrl } from 'utils/helper';
import styles from '../styles.module.scss';

export default ({ data, type }) => {
  const {
    image,
    ...rest
  }

...

return {
  imageUrl,
  className,
  ...rest
}
    title,
    subtitle,
    description,
  } = data;

  const imageUrl = getFileUrl(get(data.images, '[0]', {}));
  const className = cn(styles[type], styles.parallaxSection);

  return {
    title,
    subtitle,
    description,
    imageUrl,
    className,
  };
};
