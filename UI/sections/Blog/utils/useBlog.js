import { getDocumentFields } from 'utils/helper';

export const useBlog = ({ articles, sectionData }) => {
  const { title, description } = getDocumentFields(sectionData, ['title', 'description']);

  return {
    title,
    articles,
    description,
  };
};
