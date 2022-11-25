import { getDocumentFields } from 'utils/helper';

export const useSvgGroup = ({
  type,
  view,
  data,
  isSwiperEnabled,
  className,
  hideTitle,
}) => {
  const { title, contentList: icons } = getDocumentFields(data, ['title', 'contentList']);

  return {
    type,
    view,
    icons,
    title,
    className,
    hideTitle,
    isSwiperEnabled,
  };
};
