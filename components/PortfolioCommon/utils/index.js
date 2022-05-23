import { ANIMATED_TYPE } from 'utils/constants';

export const animatedProps = {
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

export const DEFAULT_WORKS_LIMIT = 8;

export const WORK_TYPES = {
  all: 'All',
  web: 'Web Design',
  app: 'App Design',
};

export const filterWorks = (works, { workType = WORK_TYPES.all, tags: selectedTags = [] }) => works.filter(({ tags, types }) => {
  const castedSelectedTags = selectedTags.map(({ slug }) => slug);
  const castedWorkTags = tags.map(({ slug }) => slug);

  if (selectedTags.length && !castedWorkTags.some((tag) => castedSelectedTags.includes(tag))) return false;

  return !(workType !== WORK_TYPES.all && !types.includes(workType));
});
