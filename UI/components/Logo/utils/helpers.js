import { SVG_IMAGES_TYPES } from 'utils/constants';

export const WHITE_LOGO_TYPE = [];

export const BLACK_LOGO_TYPE = [];

export const WHITE_TEXT_LOGO = [
  'home',
  'stickerbox',
  'natp',
  'footer',
  'travel-trivia',
  'cash-chat',
  'dindon',
  'smartcenter',
  'drive-focus',
  'ubichat',
  'meateater',
  'fusion-markets',
  'blackbird',
  'hotel-data-cloud',
  'humankind',
  'software-for-mri-interpretation',
  'fireaway',
  'marketplace-for-clairvoyant-services',
  'fintech-app-for-credit-score',
  'machine-learning-in-real-estate',
];

export const getLogoType = (type) => {
  const isInlineLogo = WHITE_LOGO_TYPE.includes(type);
  const isWhiteLogo = BLACK_LOGO_TYPE.includes(type);

  if (isInlineLogo) {
    return SVG_IMAGES_TYPES.whiteLogo;
  }

  if (isWhiteLogo) {
    return SVG_IMAGES_TYPES.blackLogo;
  }

  return SVG_IMAGES_TYPES.defaultLogo;
};
