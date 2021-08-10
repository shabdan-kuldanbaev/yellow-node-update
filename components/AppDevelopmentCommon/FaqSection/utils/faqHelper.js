import { getDocumentFields } from 'utils/helper';

export const getFAQList = (frequentlyAskedQuestions) => {
  if (!frequentlyAskedQuestions) {
    return [];
  }

  return frequentlyAskedQuestions.map((question) => getDocumentFields(
    question,
    ['question', 'longAnswer'],
  ));
};
