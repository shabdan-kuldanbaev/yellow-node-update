import { DEFAULT_WORK_TYPE, REVEAL_ANIMATION_PROPS } from 'utils/constants';

const linkProps = {
  isLocalLink: true,
  dynamicRouting: '/works/[project]',
  path: (id) => `/works/${id}`,
};

export const animatedFields = [
  {
    field: 'title',
    transitionDelay: 200,
    ...REVEAL_ANIMATION_PROPS,
  },
  {
    field: 'description',
    transitionDelay: 250,
    ...REVEAL_ANIMATION_PROPS,
  },
  {
    field: 'link',
    transitionDelay: 300,
    ...REVEAL_ANIMATION_PROPS,
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
