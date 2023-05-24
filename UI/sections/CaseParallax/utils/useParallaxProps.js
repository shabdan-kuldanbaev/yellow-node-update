import get from 'lodash/get';
import cn from 'classnames';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import styles from '../styles.module.scss';

export default ({ data, type }) => {
  const {
    images,
    title,
    subtitle,
    description,
    view,
    ...rest
  } = data;

  const sectionTitles = {
    title,
    subtitle,
    description,
    titleStyle: styles.titleStyle,
  };

  const imageUrl = getFileUrl(get(images, '[0]', {}));
  const subContent = get(data, 'contentModules[0]', {});
  const {
    contentList,
    imagesBundles,
  } = getDocumentFields(subContent, ['contentList', 'imagesBundles']);
  const className = cn(styles.parallaxSection, styles[type], styles[view]);
  const bundleImages = imagesBundles?.map((img) => getFileUrl(img));

  return {
    imageUrl,
    contentList,
    className,
    bundleImages,
    sectionTitles,
    ...rest,
  };
};
