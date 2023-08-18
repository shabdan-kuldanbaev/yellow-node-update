import get from 'lodash/get';
import { useMemo } from 'react';
import { getDocumentFields, getImage } from 'utils/helper';

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

  const { images: rawImages } = getDocumentFields(get(contentModules, '[0]', {}));

  const images = rawImages?.map((image) => getImage(image));

  const {
    subtitle: secondSubtitle,
    title: secondTitle,
  } = getDocumentFields(get(contentModules, '[0]', []));

  return {
    title,
    description,
    images,
    secondSubtitle,
    secondTitle,
    subtitle,
    view,
    type,
  };
};
