import get from 'lodash/get';
import { getFileUrl, getOptimizedContentfulImage } from 'utils/helper';

export default ({ data, type }) => {
  const {
    title,
    description,
    images: imagesData,
    contentModules,
    view,
  } = data;

  const images = imagesData?.map((module) => getFileUrl(module));

  const steps = contentModules?.map(({ fields }) => {
    const {
      title: stepTitle,
      subtitle,
      contentList,
      text,
    } = fields;
    const imageBundles = fields.imagesBundles?.map((bundle) => getFileUrl(bundle));

    return {
      imageBundles,
      subtitle,
      text,
      title: stepTitle,
      icon: contentList?.[0],
    };
  });

  const backgroundUrl = getOptimizedContentfulImage(
    getFileUrl(get(data, 'background', {})),
    { fm: 'webp' },
  );

  const style = backgroundUrl
    ? { backgroundImage: `url(${backgroundUrl})` }
    : {};

  return {
    type,
    style,
    title,
    description,
    images,
    steps,
    view,
  };
};
