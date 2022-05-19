import { ANIMATED_TYPE } from 'utils/constants';

const animatedProps = {
  type: ANIMATED_TYPE.isCustom,
  translateY: '2.82352941em',
  opacityDuration: 1,
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

export const DEFAULT_WORKS_LIMIT = 8;

export const WORK_TYPES = {
  all: 'All',
  web: 'Web Design',
  app: 'App Design',
};

export const filterWorks = (works, { workType = WORK_TYPES.all, tags: selectedTags = [] }) => works.filter(({ tags, types }) => {
  if (!tags.map(({ slug }) => slug).some((tag) => selectedTags.includes(tag))) return false;

  return !(workType !== WORK_TYPES.all && !types.includes(workType));
});
