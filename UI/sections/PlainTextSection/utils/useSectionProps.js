import { useMemo } from 'react';
import { getDocumentFields } from 'utils/helper';

export default ({
  sectionData,
  type,
}) => {
  const {
    title,
    description,
    subtitle,
    view,
  } = useMemo(() => getDocumentFields(
    sectionData,
    [
      'title',
      'description',
      'subtitle',
      'view',
    ],
  ), [sectionData]);

  return {
    title,
    description,
    subtitle,
    view,
    type,
  };
};
