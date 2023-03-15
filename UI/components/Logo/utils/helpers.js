import { SVG_IMAGES_TYPES } from 'utils/constants';

export const WHITE_LOGO_TYPE = [
  'fireaway',
  'fairy',
  'seven-pm-thursday',
  'fernwayer',
  'hotel-data-cloud',
  'natp',
  'travel-trivia',
  'cash-chat',
  'ubichat',
  'writer-chrome-extension',
];

export const BLACK_LOGO_TYPE = [
  'separate-us',
  'famlicious',
  'bionorica',
];

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
  'fairy',
  'seven-pm-thursday',
  'fernwayer',
  'writer-chrome-extension',
];

export const getLogoType = (type) => {
  const isWhiteLogo = WHITE_LOGO_TYPE.includes(type);
  const isBlackLogo = BLACK_LOGO_TYPE.includes(type);

  if (isWhiteLogo) {
    return SVG_IMAGES_TYPES.whiteLogo;
  }

  if (isBlackLogo) {
    return SVG_IMAGES_TYPES.blackLogo;
  }

  return SVG_IMAGES_TYPES.defaultLogo;
};
