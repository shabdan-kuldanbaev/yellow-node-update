import get from 'lodash/get';
import { getDocumentFields, getFileUrl, getOptimizedContentfulImage } from 'utils/helper';

export const useTeamSection = ({ type, data }) => {
  const {
    title,
    contentList,
    contentModules,
    imagesBundles,
  } = data;
  const specialTeamList = contentModules?.map((module) => {
    const { contentList: list, title: listTitle } = getDocumentFields(module);

    return { list, listTitle };
  });

  const images = imagesBundles?.map((image) => getFileUrl(image)) || [];

  const backgroundImageUrl = getOptimizedContentfulImage(
    getFileUrl(get(data, 'images[0]', '')),
    { fm: 'webp' },
  );

  const style = backgroundImageUrl ? { backgroundImage: `url(${backgroundImageUrl})` } : {};

  return {
    type,
    style,
    title,
    contentList,
    specialTeamList,
    images,
  };
};
