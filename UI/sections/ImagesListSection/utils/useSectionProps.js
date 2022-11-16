import get from 'lodash/get';
import { useMemo } from 'react';
import { getDocumentFields, getFileUrl } from 'utils/helper';

export default ({
  sectionData,
  type,
}) => {
  const {
    title,
    description,
    contentModules,
    view,
  } = useMemo(() => getDocumentFields(
    sectionData,
    [
      'title',
      'description',
      'contentModules',
      'view',
    ],
  ), [sectionData]);

  const { images } = getDocumentFields(get(contentModules, '[0]', {})) || {};

  const imagesUrl = images.map((image) => getFileUrl(image));

  return {
    title,
    description,
    imagesUrl,
    view,
    type,
  };
};
