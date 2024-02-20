import { SVG_IMAGES_TYPES } from 'utils/constants';
import {
  getLogoType,
  WHITE_TEXT_LOGO,
} from './helpers';

export const useLogo = ({ type = 'default' }) => {
  const svgLogoType = getLogoType(type);
  const svgTextLogoType = WHITE_TEXT_LOGO.includes(type)
    ? SVG_IMAGES_TYPES.whiteYellowText
    : SVG_IMAGES_TYPES.blackYellowText;

  return {
    type,
    svgLogoType,
    svgTextLogoType,
  };
};
