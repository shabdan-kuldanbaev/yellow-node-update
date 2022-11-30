import { getDocumentFields } from 'utils/helper';

export default ({ figureData, type, index }) => {
  const {
    title,
    description,
  } = getDocumentFields(
    figureData,
    ['title', 'description'],
  );

  return {
    index,
    type,
    title,
    description,
  };
};
