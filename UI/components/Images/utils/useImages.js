import get from 'lodash/get';
import { getImage } from 'utils/helper';
import {
  DEFAULT_DESKTOP_HEIGHT,
  DEFAULT_MOBILE_HEIGHT,
  MOBILE_HEIGHT_LIST,
  DESKTOP_HEIGHT_LIST,
} from './helpers';

export const useImages = ({
  data,
  type,
  view,
  isMobileResolution,
}) => {
  const mobileHeight = MOBILE_HEIGHT_LIST[type] || DEFAULT_MOBILE_HEIGHT;
  const desktopHeight = DESKTOP_HEIGHT_LIST[type] || DEFAULT_DESKTOP_HEIGHT;

  const classes = `${type}${data.images.length}`;
  const images = get(data, 'images');
  const imageHeight = isMobileResolution ? mobileHeight : desktopHeight;
  const imagesUrl = images?.map((image) => getImage(image));

  return {
    type,
    view,
    mobileHeight,
    desktopHeight,
    imagesUrl,
    classes,
    isMobileResolution,
    imageHeight,
  };
};
