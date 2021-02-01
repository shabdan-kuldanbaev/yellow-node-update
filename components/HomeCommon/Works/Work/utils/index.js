import { ANIMATED_TYPE } from 'utils/constants';

const animatedProps = {
  type: ANIMATED_TYPE.isCustom,
  translateY: '2.82352941em',
  opasityDuration: 1,
  transformDuration: 1,
};

const linkProps = {
  isLocalLink: true,
  dynamicRouting: '/',
  path: '/',
};

export const animatedFields = [
  {
    field: 'name',
    transitionDelay: 50,
    ...animatedProps,
  },
  {
    field: 'desc',
    transitionDelay: 50,
    ...animatedProps,
  },
  {
    field: 'link',
    transitionDelay: 50,
    ...animatedProps,
    ...linkProps,
  },
];
