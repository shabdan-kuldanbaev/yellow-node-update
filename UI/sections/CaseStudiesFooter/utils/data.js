import { SVG_IMAGES_TYPES } from 'utils/constants';

const DEFAULT_BEHANCE_DATA = {
  name: 'behance',
  href: 'https://www.behance.net/yellow_systems',
};

const DEFAULT_DRIBBLE_DATA = {
  name: 'dribbble',
  href: 'https://dribbble.com/yellow_systems',
};

const DEFAULT_INSTAGRAM_DATA = {
  name: 'instagram',
  href: 'https://www.instagram.com/yellow.systems/',
};

export const socialNetworksWhite = [
  {
    iconType: SVG_IMAGES_TYPES.behanceFilledWhite,
    ...DEFAULT_BEHANCE_DATA,
  },
  {
    iconType: SVG_IMAGES_TYPES.dribbbleFilledWhite,
    ...DEFAULT_DRIBBLE_DATA,
  },
  {
    iconType: SVG_IMAGES_TYPES.instagramFilledWhite,
    ...DEFAULT_INSTAGRAM_DATA,
  },
];

export const socialNetworksBlack = [
  {
    iconType: SVG_IMAGES_TYPES.behanceFilled,
    ...DEFAULT_BEHANCE_DATA,
  },
  {
    iconType: SVG_IMAGES_TYPES.dribbbleFilled,
    ...DEFAULT_DRIBBLE_DATA,
  },
  {
    iconType: SVG_IMAGES_TYPES.instagramFilled,
    ...DEFAULT_INSTAGRAM_DATA,
  },
];

export const CASES_BLACK_ICONS = ['open-sense'];
