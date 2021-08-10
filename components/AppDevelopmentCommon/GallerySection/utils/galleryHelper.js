import get from 'lodash/get';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import { getDocumentFields } from 'utils/helper';

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

export const getGalleryProps = (data) => {
  let link = {};
  const {
    title,
    contentModules,
  } = getDocumentFields(data);
  const galleryData = get(contentModules, '[0]', {});
  const { contentModules: slides } = getDocumentFields(galleryData);
  const linkData = get(contentModules, '[1]', null);

  if (linkData) {
    const {
      title: linkTitle,
      buttonTitle,
    } = getDocumentFields(linkData);

    link = {
      linkTitle,
      buttonTitle,
    };
  }

  return {
    title,
    slides,
    link,
  };
};
