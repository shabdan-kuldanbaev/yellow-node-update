import { DEFAULT_WORK_TYPE, REVEAL_ANIMATION_PROPS } from 'utils/constants';

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
