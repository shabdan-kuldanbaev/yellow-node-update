import get from 'lodash/get';
import { getDocumentFields, getFileUrl, getOptimizedContentfulImage } from 'utils/helper';
import { isContentVideo } from './resultsHelper';

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

  const isResultVideo = isContentVideo(type);
  const {
    contentModules: moduleData,
    images: screenImages,
    imagesBundles: bundlesImages,
  } = getDocumentFields(
    get(contentModules, '[0]', {}),
    [
      'contentModules',
      'images',
      'imagesBundles',
    ],
  );
  const prototypesUrl = (images || []).map(getFileUrl);
  const screenUrl = getFileUrl(screenImages?.[0]);
  const imagesBundles = bundlesImages?.map((bundle) => getFileUrl(bundle)) || [];

  const links = moduleData?.map((module) => {
    const { url: src, title: alt } = getDocumentFields(module, ['url', 'title']);

    return { src, alt };
  });

  return {
    view,
    type,
    title,
    description,
    prototypesUrl,
    screenUrl,
    imagesBundles,
    sectionStyle,
    isResultVideo,
    links,
  };
};
