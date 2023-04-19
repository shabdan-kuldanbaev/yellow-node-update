import get from 'lodash/get';
import cn from 'classnames';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import styles from '../styles.module.scss';

export default ({ data, type }) => {
  const {
    images,
    ...rest
  } = data;

  const imageUrl = getFileUrl(get(images, '[0]', {}));
  const subContent = get(data, 'contentModules[0]', null);
  const {
    contentList = [],
    imagesBundles = [],
  } = getDocumentFields(subContent) || {};
  const className = cn(styles[type], styles.parallaxSection);
  const bundleImages = imagesBundles?.map((img) => getFileUrl(img));

  return {
    imageUrl,
    contentList,
    className,
    bundleImages,
    ...rest,
  };
};
