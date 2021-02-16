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
    field: 'title',
    transitionDelay: 50,
    ...animatedProps,
  },
  {
    field: 'description',
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

export const imagesSizes = {
  mobileFirst: 570,
  fullFirst: 980,
  mobileSecond: 350,
  fullSecond: 515,
};
