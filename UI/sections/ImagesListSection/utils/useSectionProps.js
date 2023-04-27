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
    subtitle,
    contentModules,
    view,
  } = useMemo(() => getDocumentFields(
    section,
    [
      'title',
      'subtitle',
      'description',
      'contentModules',
      'view',
    ],
  ), [section]);

  const { images } = getDocumentFields(get(contentModules, '[0]', {}));

  const imagesUrl = images?.map((image) => getFileUrl(image));

  const {
    subtitle: secondSubtitle,
    title: secondTitle,
  } = getDocumentFields(get(contentModules, '[0]', []));

  return {
    title,
    description,
    imagesUrl,
    secondSubtitle,
    secondTitle,
    subtitle,
    view,
    type,
  };
};
