import { useMemo } from 'react';
import { getDocumentFields } from 'utils/helper';

export default ({
  section,
  type,
}) => {
  const {
    title,
    description,
    subtitle,
    view,
  } = useMemo(() => getDocumentFields(
    section,
    [
      'title',
      'description',
      'subtitle',
      'view',
    ],
  ), [section]);

  return {
    title,
    description,
    subtitle,
    view,
    type,
  };
};
