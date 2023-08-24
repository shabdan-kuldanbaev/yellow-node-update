import { useMemo } from 'react';
import get from 'lodash/get';
import { getDocumentFields } from 'utils/helper';

export default ({
  section,
  type,
  ...props
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
      'description',
      'contentModules',
      'subtitle',
      'view',
    ],
  ), [section]);

  const cta = get(contentModules, '[0]');

  return {
    title,
    description,
    subtitle,
    view,
    cta,
    type,
    ...props,
  };
};
