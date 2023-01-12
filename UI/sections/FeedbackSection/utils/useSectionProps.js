import { getDocumentFields } from 'utils/helper';

export default ({
  section,
  type,
}) => {
  const {
    title,
    secondTitle,
    budget: isSliderBudget,
  } = getDocumentFields(
    section,
    [
      'title',
      'secondTitle',
      'budget',
    ],
  );

  return {
    type,
    title,
    secondTitle,
    isSliderBudget,
  };
};
