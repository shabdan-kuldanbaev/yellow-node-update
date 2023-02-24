import { getFileUrl } from 'utils/helper';

export const useCaseFullScreenImages = ({ data, type }) => {
  const {
    title,
    subtitle,
    description,
    view,
    images,
  } = data;
  const imageUrl = getFileUrl(images[0]);

  return {
    view,
    type,
    title,
    subtitle,
    description,
    imageUrl,
  };
};
