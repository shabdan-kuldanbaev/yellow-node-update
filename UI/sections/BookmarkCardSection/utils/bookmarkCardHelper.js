import { getDocumentFields } from 'utils/helper';
import get from 'lodash/get';

export const getBookmarkCardProps = (data) => {
  const {
    title,
    contentModules,
    view,
  } = getDocumentFields(
    data,
    [
      'title',
      'contentModules',
      'view',
    ],
  );
  const linkData = get(contentModules, '[0]', {});

  const url = get(linkData, 'fields.url');

  return {
    title,
    view,
    url,
  };
};
