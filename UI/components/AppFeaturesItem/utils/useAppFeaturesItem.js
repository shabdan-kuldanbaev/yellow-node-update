import { getDocumentFields, getFileUrl } from 'utils/helper';

export const useAppFeaturesItem = ({
  type,
  view,
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

  const imagesUrl = imagesBundles?.map((imagesBundle) => getFileUrl(imagesBundle)) || [];

  return {
    type,
    view,
    title,
    text,
    imagesUrl,
    activeIndex,
    currentIndex,
    handleOnClick,
  };
};
