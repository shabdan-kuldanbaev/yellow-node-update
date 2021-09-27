import get from 'lodash/get';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import {
  getDocumentFields,
  getFileUrl,
  getOptimizedContentfulImage,
} from 'utils/helper';

const projects = {
  stickerbox: 'stickerbox',
  tell: 'tell',
  fairy: 'fairy',
  famlicious: 'famlicious',
  fernwayer: 'fernwayer',
  fireaway: 'fireaway',
};

export const getAppstoreSvgType = (slug) => {
  switch (slug) {
  case projects.stickerbox:
  case projects.fairy:
  case projects.fernwayer:
  case projects.famlicious:
    return SVG_IMAGES_TYPES.appstore;
  case projects.tell:
    return SVG_IMAGES_TYPES.blackFillAppstore;
  case projects.fireaway:
    return SVG_IMAGES_TYPES.visitSite;
  default:
    return '';
  }
};

export const getItemPreviewProps = (data) => {
  const {
    images,
    contentModules,
    view,
    title: slug,
  } = getDocumentFields(
    data,
    [
      'images',
      'contentModules',
      'view',
      'title',
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

  return {
    view,
    slug,
    title,
    subtitle,
    description,
    text,
    imagesBundles,
    downloadLink,
    appBackgroundImageUrl,
    appLogoUrl,
    sectionStyle,
  };
};

export const getItemLink = (data) => {
  const { contentModules } = getDocumentFields(data);
  const { slug } = getDocumentFields(get(contentModules, '[1]', {})) || {};

  return slug;
};
