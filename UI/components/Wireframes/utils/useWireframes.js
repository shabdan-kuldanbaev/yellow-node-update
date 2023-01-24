import { useSelector } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import { getImage } from 'utils/helper';
import { MOBILE_IMAGE_SIZE, DEFAULT_IMAGE_SIZE, IMAGE_SIZES } from './herlpers';

export const useWireframes = ({ images, type }) => {
  const isMobileResolution = useSelector(selectIsMobileResolutions);

  const wireframeImages = images?.map((image) => {
    const imageData = getImage(image);

    const height = isMobileResolution ? MOBILE_IMAGE_SIZE : IMAGE_SIZES[type] || DEFAULT_IMAGE_SIZE;

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
