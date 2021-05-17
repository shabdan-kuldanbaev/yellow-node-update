import { staticImagesUrls } from 'utils/helper';
import { SVG_IMAGES_TYPES } from 'utils/constants';

const {
  instaIcon,
  linkedinIcon,
  mediumIcon,
  dribbleIcon,
} = SVG_IMAGES_TYPES;

export const socialNetworks = [
  {
    title: 'instagram',
    href: '//www.instagram.com/yellow.systems',
    image: instaIcon,
  },
  {
    title: 'medium',
    href: '//medium.com/@yellow',
    image: mediumIcon,
  },
  {
    title: 'linkedin',
    href: '//www.linkedin.com/company/yellow-systems',
    image: linkedinIcon,
  },
  {
    title: 'dribbble',
    href: 'https://dribbble.com/yellow_systems',
    image: dribbleIcon,
  },
];
