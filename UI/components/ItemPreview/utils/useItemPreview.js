import get from 'lodash/get';
import { getDocumentFields, getFileUrl, getOptimizedContentfulImage } from 'utils/helper';

export const useItemPreview = ({ data, type }) => {
  const {
    images,
    contentModules,
    projectSlug: slug,
  } = getDocumentFields(
    data,
    [
      'images',
      'contentModules',
      'projectSlug',
    ],
  );

  const imageUrl = getOptimizedContentfulImage(
    getFileUrl(get(images, '[0]', '')),
    { fm: 'png' },
  );

  const { slug: link } = getDocumentFields(
    contentModules.find((modules) => modules.sys.contentType.sys.id === 'link'),
    ['slug'],
  );

  return {
    type,
    slug,
    imageUrl,
    link,
  };
};
