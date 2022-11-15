import { getDocumentFields, getFileUrl } from 'utils/helper';

export const useAppFeaturesItem = ({
  type,
  data,
  currentIndex,
  activeIndex,
  handleOnClick,
}) => {
  const {
    title,
    text,
    imagesBundles,
  } = getDocumentFields(data);

  const imagesUrl = imagesBundles.map((imagesBundle) => getFileUrl(imagesBundle));

  return {
    type,
    title,
    text,
    imagesUrl,
    activeIndex,
    currentIndex,
    handleOnClick,
  };
};
