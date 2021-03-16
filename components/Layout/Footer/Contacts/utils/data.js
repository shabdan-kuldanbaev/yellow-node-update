import { STATIC_IMAGES } from 'utils/helper';

const {
  instaIcon,
  linkedinIcon,
  mediumIcon,
  dribbbleIcon,
} = STATIC_IMAGES.socialNetworksIcons;

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
    image: dribbbleIcon,
  },
];
