import {
  CASE_STUDIES,
  ROUTES,
  SVG_IMAGES_TYPES,
} from 'utils/constants';

export const WHITE_LOGO_TYPE = [
  CASE_STUDIES.fireaway,
  CASE_STUDIES.fairy,
  CASE_STUDIES.sevenPmThursday,
  CASE_STUDIES.fernwayer,
  CASE_STUDIES.hotelDataCloud,
  CASE_STUDIES.natp,
  CASE_STUDIES.travelTrivia,
  CASE_STUDIES.cashChat,
  CASE_STUDIES.ubiChat,
  CASE_STUDIES.writerChromeExtension,
  CASE_STUDIES.fusionMarkets,
  CASE_STUDIES.meatEater,
  CASE_STUDIES.telemojo,
  CASE_STUDIES.blackBird,
  CASE_STUDIES.mobileFintechApp,
  CASE_STUDIES.smartcenter,
  CASE_STUDIES.dindon,
  CASE_STUDIES.humankind,
  CASE_STUDIES.cinnabar,
  CASE_STUDIES.mlInRealEstate,
  CASE_STUDIES.mobileBankApplication,
  CASE_STUDIES.balzano,
  CASE_STUDIES.cedar,
  CASE_STUDIES.mobileBudgetingApp,
  CASE_STUDIES.forexTradingPlatform,
  CASE_STUDIES.crowdfundingPlatform,
  CASE_STUDIES.metapix,
  CASE_STUDIES.kitchenEquipment,
  CASE_STUDIES.radioPlato,
  CASE_STUDIES.erp,
  CASE_STUDIES.goodPsychics,
  CASE_STUDIES.clairvoyantServices,
  CASE_STUDIES.p2pLoans,
  CASE_STUDIES.hawkin,
  CASE_STUDIES.hyve,
  CASE_STUDIES.paymentGateway,
];

export const BLACK_LOGO_TYPE = [
  CASE_STUDIES.separateUs,
  CASE_STUDIES.famlicious,
  CASE_STUDIES.bionorica,
  CASE_STUDIES.beautonomy,
  CASE_STUDIES.carbonSpace,
  CASE_STUDIES.chatSolutions,
  CASE_STUDIES.digitalWallet,
];

export const WHITE_TEXT_LOGO = [
  ROUTES.homepage.path,
  CASE_STUDIES.stickerbox,
  CASE_STUDIES.natp,
  CASE_STUDIES.travelTrivia,
  CASE_STUDIES.cashChat,
  CASE_STUDIES.dindon,
  CASE_STUDIES.smartcenter,
  CASE_STUDIES.driveFocus,
  CASE_STUDIES.ubiChat,
  CASE_STUDIES.meatEater,
  CASE_STUDIES.fusionMarkets,
  CASE_STUDIES.blackBird,
  CASE_STUDIES.hotelDataCloud,
  CASE_STUDIES.humankind,
  CASE_STUDIES.balzano,
  CASE_STUDIES.fireaway,
  CASE_STUDIES.clairvoyantServices,
  CASE_STUDIES.mobileFintechApp,
  CASE_STUDIES.mlInRealEstate,
  CASE_STUDIES.fairy,
  CASE_STUDIES.sevenPmThursday,
  CASE_STUDIES.fernwayer,
  CASE_STUDIES.writerChromeExtension,
  CASE_STUDIES.telemojo,
  CASE_STUDIES.cinnabar,
  CASE_STUDIES.cedar,
  CASE_STUDIES.mobileBankApplication,
  CASE_STUDIES.mobileBudgetingApp,
  CASE_STUDIES.forexTradingPlatform,
  CASE_STUDIES.crowdfundingPlatform,
  CASE_STUDIES.metapix,
  CASE_STUDIES.kitchenEquipment,
  CASE_STUDIES.radioPlato,
  CASE_STUDIES.erp,
  CASE_STUDIES.goodPsychics,
  CASE_STUDIES.p2pLoans,
  CASE_STUDIES.hawkin,
  CASE_STUDIES.hyve,
  CASE_STUDIES.paymentGateway,
  ROUTES.bookCall.path,
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
