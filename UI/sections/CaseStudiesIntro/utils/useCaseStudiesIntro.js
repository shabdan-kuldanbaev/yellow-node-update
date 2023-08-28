import get from 'lodash/get';
import {
  getDocumentFields,
  getFileUrl,
  getImage,
  getOptimizedContentfulImage,
} from 'utils/helper';
import { SECTION_WITH_BACKGROUND_TITLE, isAnimated, isFileVideo } from './helpers';

export const useCaseStudiesIntro = ({
  type,
  introSection,
  data,
}) => {
  const {
    title,
    subtitle,
    description,
    images,
    text: introText,
    imagesBundles,
    contentModules,
  } = getDocumentFields(
    get(data, 'contentModules[0]', {}),
    [
      'title',
      'subtitle',
      'description',
      'images',
      'text',
      'imagesBundles',
      'contentModules',
    ],
  );

  const contentList = contentModules?.map((module) => getDocumentFields(module, ['title', 'text']));

  const { contentModules: experiences } = getDocumentFields(
    get(data, 'contentModules[1]', {}),
    ['contentModules'],
  );

  const appLogoUrl = getOptimizedContentfulImage(
    getFileUrl(get(images, '[1]', '')),
    { fm: 'png', fl: 'png8' },
  );
  const appBackgroundImage = getImage(get(images, '[0]', ''));
  const backgroundImageUrl = getOptimizedContentfulImage(
    getFileUrl(get(data, 'images[0]', '')),
    { fm: 'png' },
  );
  const style = backgroundImageUrl ? { backgroundImage: `url(${backgroundImageUrl})` } : {};

  const imagesBundlesWithUrls = imagesBundles?.map((bundle) => getImage(bundle)) || [];

  const imageBackgroundTitle = SECTION_WITH_BACKGROUND_TITLE?.[type] || null;

  const isVideo = isFileVideo(type);
  const isAnimatedImg = isAnimated(type);

  return {
    type,
    style,
    introSection,
    experiences,
    appLogoUrl,
    appBackgroundImage,
    title,
    subtitle,
    description,
    introText,
    imagesBundlesWithUrls,
    imageBackgroundTitle,
    isVideo,
    contentList,
    isAnimatedImg,
  };
};
