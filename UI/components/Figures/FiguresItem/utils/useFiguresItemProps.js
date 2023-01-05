import { getDocumentFields } from 'utils/helper';

export default ({ figureData, index }) => {
  const {
    title,
    description,
    contentList,
  } = getDocumentFields(
    figureData,
    [
      'title',
      'description',
      'contentList',
    ],
  );

  return {
    index,
    title,
    icon: (contentList || [])[0],
    description,
  };
};
