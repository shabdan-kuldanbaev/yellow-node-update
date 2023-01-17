import get from 'lodash/get';
import { getFileUrl } from 'utils/helper';

export const useBackgroundImages = ({ data, type }) => {
  const images = get(data, 'images');

  const imagesWithUrl = images?.map(
    (image) => getFileUrl(image),
    {
      fm: 'png',
      fl: 'png8',
    },
  );

  return {
    type,
    imagesWithUrl,
  };
};
