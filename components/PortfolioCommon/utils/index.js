import { ANIMATED_TYPE } from 'utils/constants';

const animatedProps = {
  type: ANIMATED_TYPE.isCustom,
  translateY: '2.82352941em',
  opasityDuration: 1,
  transformDuration: 1,
};

const linkProps = {
  isLocalLink: true,
  dynamicRouting: '/works/[project]',
  path: (id) => `/works/${id}`,
};

export const animatedFields = [
  {
    field: 'title',
    transitionDelay: 200,
    ...animatedProps,
  },
  {
    field: 'description',
    transitionDelay: 250,
    ...animatedProps,
  },
  {
    field: 'link',
    transitionDelay: 300,
    ...animatedProps,
    ...linkProps,
  },
];
