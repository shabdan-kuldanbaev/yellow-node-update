import get from 'lodash/get';
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
    contentModules,
  } = getDocumentFields(
    section,
    [
      'title',
      'description',
      'subtitle',
      'view',
      'contentModules',
    ],
  );

  const { text } = getDocumentFields(get(contentModules, '[0]', []), ['text']);

  return {
    title,
    description,
    subtitle,
    view,
    type,
    text,
  };
};
