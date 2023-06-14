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
  const moduleData = getDocumentFields(get(contentModules, '[0]', {}));
  const prototypesUrl = (images || []).map(getFileUrl);
  const screenUrl = getFileUrl(moduleData?.images?.[0]);
  const imagesBundles = moduleData?.imagesBundles?.map((bundle) => getFileUrl(bundle)) || [];

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
  };
};
