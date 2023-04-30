import get from 'lodash/get';
import { getFileUrl, getOptimizedContentfulImage } from 'utils/helper';

export default ({ data, type }) => {
  const {
    title,
    subtitle,
    description,
    images: imagesData,
    contentModules,
    view,
  } = data;

  const images = imagesData?.map((module) => getFileUrl(module));

  const steps = contentModules?.map(({ fields }) => {
    const {
      title: stepTitle,
      subtitle: stepSubtitle,
      contentList,
      text,
    } = fields;
    const imageBundles = fields.imagesBundles?.map((bundle) => getFileUrl(bundle));
    const image = getFileUrl(fields.images?.[0]);

    return {
      imageBundles,
      stepSubtitle,
      text,
      stepTitle,
      icon: contentList?.[0],
      image,
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
    subtitle,
    description,
    images,
    steps,
    view,
  };
};
