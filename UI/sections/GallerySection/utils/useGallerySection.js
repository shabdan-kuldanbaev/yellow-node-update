import get from 'lodash/get';
import { getDocumentFields } from 'utils/helper';

export const useGallerySection = (data) => {
  const {
    title,
    description,
    contentModules,
  } = getDocumentFields(data);
  const galleryData = get(contentModules, '[0]', {});
  const { contentModules: slides } = getDocumentFields(galleryData);
  const linkData = get(contentModules, '[1]', null);

  const {
    title: linkTitle,
    buttonTitle: buttonLinkTitle,
  } = linkData ? getDocumentFields(linkData) : { title: '', buttonTitle: '' };

  return {
    title,
    linkTitle,
    buttonLinkTitle,
    description,
    slides,
    linkData,
  };
};
