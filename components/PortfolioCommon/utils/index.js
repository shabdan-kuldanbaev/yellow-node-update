import { ANIMATED_TYPE, DEFAULT_WORK_TYPE } from 'utils/constants';

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
  mobile: 'Mobile development',
  uiUx: 'UI/UX design',
  chat: 'Chat development',
  web: 'Web development',
  aiMl: 'AI & ML',
};

const slugMapper = ({ slug }) => slug;

export const filterWorks = (works, { workType = DEFAULT_WORK_TYPE, tag: selectedTag = null }) => works.filter(({ tags, types }) => {
  const castedWorkTags = tags.map(slugMapper);
  const castedWorkTypes = types.map(slugMapper);

  if (selectedTag && !castedWorkTags.includes(selectedTag.slug)) return false;

  return !(workType !== DEFAULT_WORK_TYPE && !castedWorkTypes.includes(workType.slug));
});
