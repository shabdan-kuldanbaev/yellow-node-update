import { SVG_IMAGES_TYPES } from 'utils/constants';

export const DEFAULT_TITLE_CONFIG = {
  titleIcon: null,
  beginSlice: undefined,
  endSlice: 0,
};

export const TITLE_CONFIG = {
  meatEater: {
    ...DEFAULT_TITLE_CONFIG,
    beginSlice: 0,
    endSlice: 4,
  },
  separateUs: {
    ...DEFAULT_TITLE_CONFIG,
    beginSlice: 0,
    endSlice: 8,
  },
  openSense: {
    ...DEFAULT_TITLE_CONFIG,
    titleIcon: SVG_IMAGES_TYPES.opensenseTitleBorder,
  },
};

export const getTitleText = (title, beginSlice, endSlice) => {
  const titleFirstPart = title?.slice(beginSlice, endSlice);
  const titleSecondPart = title?.slice(endSlice);

  return {
    titleFirstPart,
    titleSecondPart,
  };
};
