import { getDocumentFields } from 'utils/helper';

export const useFaqSection = ({ section, type }) => {
  const {
    title,
    contentModules,
  } = getDocumentFields(section);

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
