import get from 'lodash/get';
import { getDocumentFields, getFileUrl, getImage } from 'utils/helper';

export default ({
  section,
  type,
}) => {
  const {
    budget: isSliderBudget,
    images: rawImages,
    contentModules,
    ...rest
  } = getDocumentFields(
    section,
  );

  const images = (rawImages || []).map(getImage);

  const { images: rawFiles } = getDocumentFields(get(contentModules, '[0]'), ['images']);
  const files = (rawFiles || []).map(getFileUrl);

  return {
    ...rest,
    isSliderBudget,
    type,
    images,
    files,
  };
};
