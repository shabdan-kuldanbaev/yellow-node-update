import get from 'lodash/get';
import { useMemo } from 'react';
import { getDocumentFields, getFileUrl } from 'utils/helper';

export default ({
  section,
  type,
}) => {
  const {
    title,
    description,
    images,
    contentModules,
  } = useMemo(() => getDocumentFields(
    section,
    [
      'title',
      'description',
      'images',
      'contentModules',
    ],
  ), [section]);

  const { text } = getDocumentFields(get(contentModules, '[0]', {}));
  const imageUrl = getFileUrl(get(images, '[0]'));

  return {
    title,
    description,
    text,
    imageUrl,
    type,
  };
};
