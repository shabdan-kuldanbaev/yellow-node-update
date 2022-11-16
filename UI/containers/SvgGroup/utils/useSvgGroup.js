import { getDocumentFields } from 'utils/helper';
import { getSwiperParams } from './helpers';

export const useSvgGroup = ({
  type,
  view,
  data,
  isSwiperEnabled,
  className,
  hideTitle,
}) => {
  const { title, contentList: icons } = getDocumentFields(data, ['title', 'contentList']);

  const swiperParams = getSwiperParams();

  return {
    type,
    view,
    icons,
    title,
    className,
    hideTitle,
    swiperParams,
    isSwiperEnabled,
  };
};
