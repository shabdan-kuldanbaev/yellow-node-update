import { getDocumentFields, getImage } from 'utils/helper';

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

  const [image] = (images || []).map((file) => getImage(file));

  const { slug: link } = getDocumentFields(
    contentModules?.find((modules) => modules?.sys?.contentType?.sys?.id === 'link'),
    ['slug'],
  );

  return {
    type,
    slug,
    image,
    link,
  };
};
