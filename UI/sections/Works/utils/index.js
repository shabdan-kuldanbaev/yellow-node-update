const slugMapper = ({ slug }) => slug;

export const filterWorks = (works, { selectedTypes = [], selectedTags = [] }) => {
  if (!selectedTypes.length && !selectedTags.length) {
    return works;
  }

  return works.filter(({ tags, types }) => {
    const castedFilterTypes = selectedTypes.map(slugMapper);
    const castedFilterTags = selectedTags.map(slugMapper);
    const castedWorkTypes = types.map(slugMapper);
    const castedWorkTags = tags.map(slugMapper);

    const isTagMatched = castedFilterTags.some((tag) => castedWorkTags.includes(tag));
    const isTypeMatched = castedFilterTypes.some((type) => castedWorkTypes.includes(type));

    if (!selectedTypes.length) {
      return isTagMatched;
    }

    if (!selectedTags.length) {
      return isTypeMatched;
    }

    return isTypeMatched && isTagMatched;
  });
};
