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
  const {
    tableContent,
    tableType,
  } = getDocumentFields(get(contentModules, '[0]', []), ['tableContent', 'tableType']);

  return {
    title,
    description,
    subtitle,
    view,
    type,
    tableContent,
    tableType,
  };
};
