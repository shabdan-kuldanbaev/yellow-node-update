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
  const linkData = get(contentModules, '[1]', null);

  const {
    title: linkTitle,
    buttonTitle: buttonLinkTitle,
  } = linkData ? getDocumentFields(linkData) : { title: '', buttonTitle: '' };

  return {
    type,
    title,
    linkTitle,
    buttonLinkTitle,
    description,
    slides,
    linkData,
    handleOnCTAClick,
  };
};
