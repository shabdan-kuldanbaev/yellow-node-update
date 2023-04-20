import { SOCIAL_MEDIA } from 'utils/constants/contacts';

export const socialNetworks = Object.values(SOCIAL_MEDIA)
  .filter(({ id }) => [
    'behance',
    'dribbble',
    'instagram',
  ].includes(id));

export const CASES_BLACK_ICONS = ['open-sense', 'tell'];
