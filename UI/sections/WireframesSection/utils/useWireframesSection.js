import get from 'lodash/get';
import { getFileUrl, getOptimizedContentfulImage } from 'utils/helper';

export const useWireframesSection = ({ data, type }) => {
  const sectionBackgroundImage = getOptimizedContentfulImage(
    getFileUrl(get(data, 'background', {})),
    { fm: 'png' },
  );
  const sectionStyle = sectionBackgroundImage ? { backgroundImage: `url(${sectionBackgroundImage})` } : {};
  const { title, description, images } = data;

  return {
    type,
    title,
    images,
    description,
    sectionStyle,
  };
};
