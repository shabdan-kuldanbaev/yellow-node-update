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

  const {
    images,
    subtitle: secondSubtitle,
    title: secondTitle,
  } = getDocumentFields(get(contentModules, '[0]', {}), [
    'images',
    'title',
    'subtitle',
  ]);

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
