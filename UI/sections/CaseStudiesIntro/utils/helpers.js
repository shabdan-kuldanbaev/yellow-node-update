import { SVG_IMAGES_TYPES, CASE_STUDIES } from 'utils/constants';

export const PAGE_WITH_TRANSPERENT_LOGO = ['stickerbox'];
export const PAGE_WITH_TRANSPERENT_IMAGE = ['stickerbox'];
export const PAGE_WITH_TRANSPERENT_IMAGE_BUNDLES = [];

export const SECTION_WITH_BACKGROUND_TITLE = {
  'open-sense': SVG_IMAGES_TYPES.opensenseTitleBorder,
};

export const isFileVideo = (type) => [
  CASE_STUDIES.forexTradingPlatform,
].includes(type);
