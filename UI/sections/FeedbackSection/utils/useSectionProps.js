import { getDocumentFields, getImage } from 'utils/helper';

export default ({
  section,
  type,
}) => {
  const {
    budget: isSliderBudget,
    images: rawImages,
    ...rest
  } = getDocumentFields(
    section,
    [
      'title',
      'secondTitle',
      'budget',
      'slug',
      'subtitle',
      'images',
    ],
  );

  const images = (rawImages || []).map(getImage);

  return {
    ...rest,
    isSliderBudget,
    type,
    images,
  };
};
