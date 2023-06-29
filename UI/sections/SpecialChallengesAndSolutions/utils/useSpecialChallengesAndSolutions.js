import { getBackgroundStyle, checkBackgroundImageDisplaying } from './challengesHelper';

export const useSpecialChallengesAndSolutions = ({ data, type }) => {
  const {
    title,
    subtitle,
    description,
  } = data;
  const sectionBackgroundImage = getBackgroundStyle(type, data);
  const displayBackgroundImage = checkBackgroundImageDisplaying(type);

  return {
    data,
    type,
    title,
    subtitle,
    description,
    sectionBackgroundImage,
    displayBackgroundImage,
  };
};
