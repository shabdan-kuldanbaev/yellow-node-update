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
    view,
  } = getDocumentFields(
    sectionData,
    [
      'title',
      'description',
      'contentModules',
      'view',
    ],
  );
  const galleryData = get(contentModules, '[0]', {});
  const { contentModules: slides } = getDocumentFields(galleryData, ['contentModules']);
  const ctaData = get(contentModules, '[1]', null);

  return {
    view,
    type,
    title,
    description,
    slides,
    handleOnCTAClick,
    ctaData,
  };
};
