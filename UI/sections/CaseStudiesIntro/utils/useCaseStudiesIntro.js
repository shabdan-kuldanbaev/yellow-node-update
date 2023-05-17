import get from 'lodash/get';
import {
  getDocumentFields,
  getFileUrl,
  getOptimizedContentfulImage,
} from 'utils/helper';
import { SECTION_WITH_BACKGROUND_TITLE } from './helpers';

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
  } = getDocumentFields(
    get(data, 'contentModules[0]', {}),
    [
      'title',
      'subtitle',
      'description',
      'images',
      'text',
      'imagesBundles',
    ],
  );

  const { contentModules: experiences } = getDocumentFields(
    get(data, 'contentModules[1]', {}),
    ['contentModules'],
  );

  const appLogoUrl = getOptimizedContentfulImage(
    getFileUrl(get(images, '[1]', '')),
    { fm: 'png', fl: 'png8' },
  );
  const appBackgroundImageUrl = getOptimizedContentfulImage(
    getFileUrl(get(images, '[0]', '')),
    { fm: 'png', fl: 'png8' },
  );
  const backgroundImageUrl = getOptimizedContentfulImage(
    getFileUrl(get(data, 'images[0]', '')),
    { fm: 'png' },
  );
  const style = backgroundImageUrl ? { backgroundImage: `url(${backgroundImageUrl})` } : {};

  const imagesBundlesWithUrls = imagesBundles?.map((bundle) => getFileUrl(bundle)) || [];

  const imageBackgroundTitle = SECTION_WITH_BACKGROUND_TITLE?.[type] || null;

  return {
    type,
    style,
    introSection,
    experiences,
    appLogoUrl,
    appBackgroundImageUrl,
    title,
    subtitle,
    description,
    introText,
    imagesBundlesWithUrls,
    imageBackgroundTitle,
  };
};
