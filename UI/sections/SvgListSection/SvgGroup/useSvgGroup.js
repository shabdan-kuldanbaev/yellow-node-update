import { getSvgGroupProps, getSwiperParams } from '../utils/svgHelper';

export const useSvgGroup = ({
  data,
  isSwiperEnabled,
  className,
  hideTitle,
}) => {
  const { title, contentList: icons } = getSvgGroupProps(data);

  const swiperParams = getSwiperParams({ isEnabled: isSwiperEnabled });

  return {
    icons,
    title,
    className,
    hideTitle,
    swiperParams,
    isSwiperEnabled,
  };
};
