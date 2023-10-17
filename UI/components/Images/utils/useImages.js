import get from 'lodash/get';

export const useImages = ({
  data,
  type,
  view,
}) => {
  const images = get(data, 'images');

  return {
    type,
    view,
    images,
  };
};
