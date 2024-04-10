import { getDocumentFields, getFileUrl } from 'utils/helper';

export const useAppFeaturesItem = ({
  type,
  view,
  data,
  currentIndex,
  activeIndex,
  handleOnClick,
  className,
}) => {
  const {
    title,
    text,
    imagesBundles,
    contentList,
  } = getDocumentFields(data, [
    'title',
    'text',
    'imagesBundles',
    'contentList',
  ]);

  return {
    type,
    view,
    title,
    text,
    imagesBundles,
    activeIndex,
    currentIndex,
    handleOnClick,
    customIcon: contentList?.[0],
    className,
  };
};
