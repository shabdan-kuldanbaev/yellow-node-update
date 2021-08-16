import { getDocumentFields } from 'utils/helper';

export function getFAQList(frequentlyAskedQuestions = []) {
  return frequentlyAskedQuestions.map((question) => getDocumentFields(
    question,
    ['question', 'longAnswer'],
  ));
}
