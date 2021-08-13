import { SVG_IMAGES_TYPES } from 'utils/constants';

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
