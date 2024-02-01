export const findTagBySlug = (tagsList, slug) => tagsList?.find((tag) => tag.slug === slug);

export const findCategoryBySlug = (categories, slug) => categories[slug];
