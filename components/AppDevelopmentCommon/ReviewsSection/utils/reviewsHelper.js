import get from 'lodash/get';
import { getDocumentFields, getFileUrl } from 'utils/helper';

export const getReviewsProps = (data) => {
  let reviews = [];
  const {
    title,
    contentModules,
  } = getDocumentFields(data);
  const { contentModules: reviewsData } = getDocumentFields(get(contentModules, '[0]', {}));

  if (reviewsData) {
    reviews = reviewsData.map((module) => {
      const {
        contentList,
        contentModules: review,
        text,
      } = getDocumentFields(module);
      const logo = get(contentList, '[0]', '');
      const {
        avatar,
        fullName: name,
        position,
      } = getDocumentFields(get(review, '[0]'));

      return {
        name,
        position,
        avatar: getFileUrl(avatar),
        logo,
        text,
      };
    });
  }

  return {
    reviews,
    title,
  };
};

export const getGroupReducer = (groupBy) => (acc, review) => {
  const lastGroup = acc.length - 1;

  if (acc[lastGroup].length < groupBy) {
    acc[lastGroup].push(review);

    return acc;
  }

  acc.push([review]);

  return acc;
};
