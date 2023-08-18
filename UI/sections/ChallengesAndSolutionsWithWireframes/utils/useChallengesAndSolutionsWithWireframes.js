import { getImage } from 'utils/helper';

export const useChallengesAndSolutionsWithWireframes = ({ data, type }) => {
  const {
    title,
    subtitle,
    description,
    view,
    images,
    background,
  } = data;

  return {
    data,
    type,
    view,
    images,
    title,
    subtitle,
    description,
    background: getImage(background),
  };
};
