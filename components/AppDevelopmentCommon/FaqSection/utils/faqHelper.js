import { getDocumentFields } from 'utils/helper';

export const getFAQList = (frequentlyAskedQuestions = []) => frequentlyAskedQuestions.map((question) => getDocumentFields(
  question,
  ['question', 'longAnswer'],
));
