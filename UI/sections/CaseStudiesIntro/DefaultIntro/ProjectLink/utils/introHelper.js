import { SVG_IMAGES_TYPES, CASE_STUDIES } from 'utils/constants';

export const getAppstoreSvgType = (caseStudy) => {
  switch (caseStudy) {
  case CASE_STUDIES.tell:
    return SVG_IMAGES_TYPES.blackFillAppstore;
  default:
    return SVG_IMAGES_TYPES.appstore;
  }
};
