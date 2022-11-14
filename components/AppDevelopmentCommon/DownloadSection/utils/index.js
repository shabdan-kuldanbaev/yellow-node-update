import get from 'lodash/get';
import { getDocumentFields } from 'utils/helper';

export const getProps = (data) => {
  const {
    title,
    description,
    subtitle,
    contentModules,
    view,
  } = getDocumentFields(
    data,
    [
      'title',
      'description',
      'contentModules',
      'subtitle',
      'view',
    ],
  );

  const link = getDocumentFields(get(contentModules, '[0]'));

  return {
    title,
    description,
    subtitle,
    view,
    link,
  };
};
