export const getTagSlugs = (tagList) => tagList.reduce((acc, { slug }) => {
  acc.push(slug);

  return acc;
}, []);

export const findTagBySlug = (tagsList, slug) => tagsList.find((tag) => tag.slug === slug);
