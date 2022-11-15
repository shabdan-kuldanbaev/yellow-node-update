import { getDocumentFields } from 'utils/helper';

export const useFaqSection = ({ data, type }) => {
  const {
    title,
    contentModules,
  } = getDocumentFields(data);

  const faqList = contentModules.map((question) => getDocumentFields(
    question,
    ['question', 'longAnswer'],
  ));

  return {
    type,
    title,
    faqList,
    contentModules,
  };
};
