import get from 'lodash/get';
import {
  getFileUrl,
  getOptimizedContentfulImage,
  getDocumentFields,
} from 'utils/helper';

export const getParallaxProps = (data) => {
  let contentList = [];
  const imageUrl = getOptimizedContentfulImage(
    getFileUrl(data.images[0]),
    { fm: 'png', fl: 'png8' },
  );
  const subContent = get(data, 'contentModules[0]', null);

  if (subContent) {
    const { contentList: list } = getDocumentFields(subContent);
    contentList = list;
  }

  return {
    imageUrl,
    contentList,
  };
};
