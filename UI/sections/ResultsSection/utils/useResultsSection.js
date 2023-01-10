import get from 'lodash/get';
import { getFileUrl, getOptimizedContentfulImage } from 'utils/helper';
import { isResultHasVideo, getResultProps } from './resultsHelper';

export const useResultsSection = ({ data, type }) => {
  const sectionBackgroundImage = getOptimizedContentfulImage(
    getFileUrl(get(data, 'background', {})),
    { fm: 'png' },
  );
  const sectionStyle = sectionBackgroundImage ? { backgroundImage: `url(${sectionBackgroundImage})` } : {};

  const {
    view,
    title,
    description,
    images,
    smartphoneUrl,
    appScreenUrl,
    imagesBundlesData,
  } = getResultProps(data);

  const isResultVideo = isResultHasVideo(type);

  const imagesBundles = imagesBundlesData?.imagesBundles.map((bundle) => getFileUrl(bundle)) || [];

  return {
    view,
    type,
    images,
    title,
    description,
    smartphoneUrl,
    appScreenUrl,
    imagesBundles,
    sectionStyle,
    isResultVideo,
  };
};
