import { useMemo } from 'react';
import { getDocumentFields } from '../../../utils/helper';

export default (props) => {
  const {
    title,
    description,
    subtitle,
    view,
  } = useMemo(() => getDocumentFields(
    props,
    [
      'title',
      'description',
      'subtitle',
      'view',
    ],
  ), [props]);

  return {
    title,
    description,
    subtitle,
    view,
  };
};
