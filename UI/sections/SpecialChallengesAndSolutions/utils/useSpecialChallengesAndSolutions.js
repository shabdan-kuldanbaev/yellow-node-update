import { getBackgroundStyle } from './challengesHelper';

export const useSpecialChallengesAndSolutions = ({ data, type }) => {
  const {
    title,
    subtitle,
    description,
  } = data;
  const sectionBackgroundImage = getBackgroundStyle(type, data);

  return {
    data,
    type,
    title,
    subtitle,
    description,
    sectionBackgroundImage,
  };
};
