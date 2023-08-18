import { useSelector } from 'react-redux';
import { selectIsMobile } from 'redux/selectors/layout';
import { getImage } from 'utils/helper';
import {
  DEFAULT_MOBILE_IMAGE_SIZE,
  DEFAULT_IMAGE_SIZE,
  IMAGE_SIZES,
  MOBILE_IMAGE_SIZES,
} from './herlpers';

export const useWireframes = ({
  images,
  type,
  view,
}) => {
  const isMobileResolution = useSelector(selectIsMobile);

  const wireframeImages = images?.map((image) => {
    const imageData = getImage(image);

    const height = isMobileResolution
      ? MOBILE_IMAGE_SIZES[type]?.[view || 'default'] || DEFAULT_MOBILE_IMAGE_SIZE
      : IMAGE_SIZES[type]?.[view || 'default'] || DEFAULT_IMAGE_SIZE;

    const scale = height / imageData.height;

    const width = Math.trunc(imageData.width * scale);

    return {
      url: imageData.url,
      width,
      height,
    };
  });

  return {
    type,
    images,
    wireframeImages,
    isMobileResolution,
  };
};
