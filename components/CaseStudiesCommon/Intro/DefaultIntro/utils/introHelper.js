import { SVG_IMAGES_TYPES, CASE_STUDIES } from 'utils/constants';

export const getAppstoreSvgType = (caseStudy) => {
  switch (caseStudy) {
  case CASE_STUDIES.tell:
    return SVG_IMAGES_TYPES.blackFillAppstore;
  case CASE_STUDIES.fernwayer:
  case CASE_STUDIES.stickerbox:
  case CASE_STUDIES.fairy:
  case CASE_STUDIES.sevenPmThursday:
    return SVG_IMAGES_TYPES.appstore;
  default:
    return SVG_IMAGES_TYPES.appstore;
  }
};
