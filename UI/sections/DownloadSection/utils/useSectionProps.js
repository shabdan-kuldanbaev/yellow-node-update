import { useMemo } from 'react';
import get from 'lodash/get';
import { getDocumentFields } from 'utils/helper';

export default (props) => {
  const {
    title,
    description,
    subtitle,
    contentModules,
    view,
  } = useMemo(() => getDocumentFields(
    props,
    [
      'title',
      'description',
      'contentModules',
      'subtitle',
      'view',
    ],
  ), [props]);

  const link = getDocumentFields(get(contentModules, '[0]'));

  return {
    title,
    description,
    subtitle,
    view,
    link,
  };
};
