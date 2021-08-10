import get from 'lodash/get';
import { getDocumentFields, getFileUrl } from 'utils/helper';

export const getReviewsProps = (data) => {
  const { contentModules } = getDocumentFields(get(data, '[0]', {}));

  const reviews = contentModules.map((module) => {
    const {
      contentList,
      contentModules: reviewData,
      text,
    } = getDocumentFields(module);
    const logo = get(contentList, '[0]', '');
    const {
      avatar,
      fullName: name,
      position,
    } = getDocumentFields(get(reviewData, '[0]'));

    return {
      name,
      position,
      avatar: getFileUrl(avatar),
      logo,
      text,
    };
  });

  return reviews;
};
