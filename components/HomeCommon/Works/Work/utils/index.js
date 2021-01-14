import { animatedType } from 'utils/constants';

const animatedProps = {
  type: animatedType.isCustom,
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
