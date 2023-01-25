import { getFileUrl } from 'utils/helper';

export const useTeamSection = ({ type, data }) => {
  const {
    title,
    contentList,
    imagesBundles,
  } = data;

  const images = imagesBundles?.map((image) => getFileUrl(image)) || [];

  return {
    type,
    title,
    contentList,
    images,
  };
};
