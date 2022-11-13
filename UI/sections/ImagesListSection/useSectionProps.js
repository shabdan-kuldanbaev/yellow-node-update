import get from 'lodash/get';
import { useMemo } from 'react';
import { getDocumentFields } from '../../../utils/helper';

export default (props) => {
  const {
    title,
    description,
    contentModules,
    view,
  } = useMemo(() => getDocumentFields(
    props,
    [
      'title',
      'description',
      'contentModules',
      'view',
    ],
  ), [props]);

  const { images } = getDocumentFields(get(contentModules, '[0]', {})) || {};

  return {
    title,
    description,
    images,
    view,
  };
};
