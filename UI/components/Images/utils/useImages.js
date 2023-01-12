import get from 'lodash/get';
import { getFileUrl, getOptimizedContentfulImage } from 'utils/helper';
import { DESKTOP_HEIGHT, MOBILE_HEIGHT } from './helpers';

export const useImages = ({
  data,
  type,
  view,
  isMobileResolution,
}) => {
  const classes = `${type}${data.images.length}`;
  const images = get(data, 'images');

  const imagesUrl = images?.map((image) => getOptimizedContentfulImage(
    getFileUrl(image),
    {
      height: isMobileResolution ? MOBILE_HEIGHT : DESKTOP_HEIGHT,
      fm: 'png',
      fl: 'png8',
    },
  ));

  return {
    type,
    view,
    imagesUrl,
    classes,
    isMobileResolution,
  };
};
