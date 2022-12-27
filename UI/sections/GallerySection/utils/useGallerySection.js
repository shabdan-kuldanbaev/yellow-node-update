import get from 'lodash/get';
import { getDocumentFields } from 'utils/helper';

export const useGallerySection = ({
  type,
  sectionData,
  handleOnCTAClick,
}) => {
  const {
    title,
    description,
    contentModules,
  } = getDocumentFields(sectionData);
  const galleryData = get(contentModules, '[0]', {});
  const { contentModules: slides } = getDocumentFields(galleryData);
  const link = getDocumentFields(get(contentModules, '[1]', null));

  return {
    type,
    title,
    description,
    slides,
    link,
    handleOnCTAClick,
  };
};
