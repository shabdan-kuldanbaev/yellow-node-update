import { ANIMATED_TYPE } from 'utils/constants';

const animatedProps = {
  type: ANIMATED_TYPE.isCustom,
  translateY: '2.82352941em',
  opasityDuration: 1,
  transformDuration: 1,
};

const linkProps = {
  isLocalLink: true,
  dynamicRouting: '/portfolio/[project]',
  path: (id) => `/portfolio/${id}`,
};

export const animatedFields = [
  {
    field: 'title',
    transitionDelay: 300,
    ...animatedProps,
  },
  {
    field: 'description',
    transitionDelay: 350,
    ...animatedProps,
  },
  {
    field: 'link',
    transitionDelay: 400,
    ...animatedProps,
    ...linkProps,
  },
];
