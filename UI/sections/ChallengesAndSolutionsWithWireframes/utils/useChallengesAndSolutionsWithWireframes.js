import get from 'lodash/get';
import { getFileUrl, getOptimizedContentfulImage } from 'utils/helper';

export const useChallengesAndSolutionsWithWireframes = ({ data, type }) => {
  const sectionBackgroundImage = getOptimizedContentfulImage(
    getFileUrl(get(data, 'background', {})),
    { fm: 'png' },
  );
  const sectionStyle = sectionBackgroundImage ? { backgroundImage: `url(${sectionBackgroundImage})` } : {};
  const {
    title, subtitle, description, view, images,
  } = data;

  return {
    data,
    type,
    view,
    images,
    title,
    subtitle,
    description,
    sectionStyle,
  };
};
