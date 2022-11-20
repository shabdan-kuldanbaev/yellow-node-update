import { isTitleHasBackground } from 'components/CaseStudiesCommon/Intro/VerticalIntro/utils/introHelper';
import get from 'lodash/get';
import {
  getDocumentFields,
  getFileUrl,
  getOptimizedContentfulImage,
} from 'utils/helper';
import {
  TITLE_CONFIG,
  DEFAULT_TITLE_CONFIG,
  getTitleText,
} from './helpers';

export const useItemPreview = (data) => {
  const {
    images,
    contentModules,
    view,
    projectSlug: slug,
  } = getDocumentFields(
    data,
    [
      'images',
      'contentModules',
      'view',
      'title',
      'projectSlug',
    ],
  );

  const {
    title,
    subtitle,
    description,
    text,
    images: contentImages,
    contentModules: contentData,
    imagesBundles,
  } = getDocumentFields(get(contentModules, '[0]', {}));

  const downloadLink = getDocumentFields(get(contentData, '[0]'));

  const appBackgroundImageUrl = getOptimizedContentfulImage(
    getFileUrl(get(contentImages, '[0]', '')),
    { fm: 'png', fl: 'png8' },
  );

  const appLogoUrl = getOptimizedContentfulImage(
    getFileUrl(get(contentImages, '[1]', '')),
    { fm: 'png', fl: 'png8' },
  );

  const sectionBackgroundImageUrl = getOptimizedContentfulImage(
    getFileUrl(get(images, '[0]', '')),
    { fm: 'png' },
  );

  const sectionStyle = sectionBackgroundImageUrl
    ? { backgroundImage: `url(${sectionBackgroundImageUrl})` }
    : {};

  const { slug: link } = getDocumentFields(get(contentModules, '[1]')) || {};

  const imagesBundlesUrl = imagesBundles?.map((bundle) => getFileUrl(bundle));

  const {
    isTitleWithIcon,
    beginSlice,
    endSlice,
  } = TITLE_CONFIG[slug] || DEFAULT_TITLE_CONFIG;

  const isTitleHasIcon = isTitleWithIcon && isTitleHasBackground(slug);

  const { titleFirstPart, titleSecondPart } = getTitleText(title, beginSlice, endSlice);

  return {
    view,
    slug,
    title,
    subtitle,
    description,
    text,
    imagesBundlesUrl,
    downloadLink,
    appBackgroundImageUrl,
    appLogoUrl,
    sectionStyle,
    link,
    isTitleHasIcon,
    titleFirstPart,
    titleSecondPart,
  };
};
