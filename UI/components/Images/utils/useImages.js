import get from 'lodash/get';
import { getImage } from 'utils/helper';

export const useImages = ({
  data,
  type,
  view,
}) => {
  const images = get(data, 'images');
  const imagesUrl = images?.map((image) => getImage(image));

  return {
    type,
    view,
    imagesUrl,
  };
};
