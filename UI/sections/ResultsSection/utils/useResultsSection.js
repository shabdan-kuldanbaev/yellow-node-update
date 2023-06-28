import get from 'lodash/get';
import {
  getFileUrl,
  getDocumentFields,
  getOptimizedContentfulImage,
} from 'utils/helper';

export const useResultsSection = ({ data, type }) => {
  const {
    title,
    subtitle,
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

  const moduleData = getDocumentFields(
    get(contentModules, '[0]', {}),
    [
      'images',
      'imagesBundles',
      'contentModules',
    ],
  );
  const screenUrl = getFileUrl(moduleData?.images?.[0]);
  const imagesBundles = moduleData?.imagesBundles?.map((bundle) => getFileUrl(bundle)) || [];
  const { url: prototypeLink } = getDocumentFields(get(moduleData.contentModules, '[0]', {}), ['url']);

  return {
    view,
    type,
    title,
    subtitle,
    description,
    screenUrl,
    imagesBundles,
    images,
    sectionStyle,
    prototypeLink,
  };
};
