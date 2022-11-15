import { useMemo } from 'react';
import get from 'lodash/get';
import { getDocumentFields } from 'utils/helper';

export default (props) => {
  const {
    sectionData,
    type,
  } = props;

  const {
    title,
    description,
    subtitle,
    contentModules,
    view,
  } = useMemo(() => getDocumentFields(
    sectionData,
    [
      'title',
      'description',
      'contentModules',
      'subtitle',
      'view',
    ],
  ), [sectionData]);

  const link = getDocumentFields(get(contentModules, '[0]'));

  return {
    title,
    description,
    subtitle,
    view,
    link,
    type,
  };
};
