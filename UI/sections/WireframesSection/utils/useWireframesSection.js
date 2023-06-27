import get from 'lodash/get';
import { getFileUrl, getOptimizedContentfulImage } from 'utils/helper';

export const useWireframesSection = ({ data, type }) => {
  const {
    title,
    subtitle,
    description,
    images,
    view,
  } = data;

  const sectionBackgroundImage = getOptimizedContentfulImage(
    getFileUrl(get(data, 'background', {})),
    { fm: 'png' },
  );
  const sectionStyle = sectionBackgroundImage ? { backgroundImage: `url(${sectionBackgroundImage})` } : {};

  return {
    type,
    view,
    title,
    images,
    subtitle,
    description,
    sectionStyle,
  };
};
