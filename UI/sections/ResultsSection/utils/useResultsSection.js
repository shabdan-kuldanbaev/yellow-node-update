import get from 'lodash/get';
import {
  getFileUrl,
  getDocumentFields,
  getOptimizedContentfulImage,
} from 'utils/helper';

export const useResultsSection = ({ data, type }) => {
  const {
    title,
    description,
    images,
    contentModules,
    view,
    background,
  } = data;

  const sectionBackgroundImage = getOptimizedContentfulImage(
    getFileUrl(background),
    { fm: 'webp' },
  );
  const sectionStyle = sectionBackgroundImage ? { backgroundImage: `url(${sectionBackgroundImage})` } : {};

  const moduleData = getDocumentFields(get(contentModules, '[0]', {}));
  const screenUrl = getFileUrl(moduleData?.images?.[0]);
  const imagesBundles = moduleData?.imagesBundles?.map((bundle) => getFileUrl(bundle)) || [];

  return {
    view,
    type,
    title,
    description,
    screenUrl,
    imagesBundles,
    images,
    sectionStyle,
  };
};
