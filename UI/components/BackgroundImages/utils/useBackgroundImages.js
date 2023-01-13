import get from 'lodash/get';
import { getFileUrl, getOptimizedContentfulImage } from 'utils/helper';

export const useBackgroundImages = ({ data, type }) => {
  const images = get(data, 'images');

  const imagesWithUrl = images?.map((image) => getOptimizedContentfulImage(
    getFileUrl(image),
    {
      fm: 'png',
      fl: 'png8',
    },
  ));

  return {
    type,
    imagesWithUrl,
  };
};
