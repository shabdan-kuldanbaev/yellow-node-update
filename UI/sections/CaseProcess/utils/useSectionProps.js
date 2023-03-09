import get from 'lodash/get';
import { getFileUrl, getOptimizedContentfulImage } from 'utils/helper';

export default ({ data, type }) => {
  const {
    title,
    images: imagesData,
    contentModules,
  } = data;

  const images = imagesData?.map((module) => getFileUrl(module));

  const steps = contentModules?.map(({ fields }) => {
    const {
      title: stepTitle,
      description,
      subtitle,
    } = fields;
    const imageBundles = fields.imagesBundles?.map((bundle) => getFileUrl(bundle));

    return {
      imageBundles,
      subtitle,
      description,
      title: stepTitle,
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
    images,
    steps,
  };
};
