import { cache } from 'react';
import { blogClient } from 'utils/contentful/client';

export const getPersonRelatedArticles = cache(async ({
  id,
  skip,
  limit,
}) => {
  const res = await blogClient.getEntries({
    contentType: 'article',
    additionalQueryParams: {
      links_to_entry: id,
      order: '-fields.publishedAt',
      skip,
      limit,
    },
  });

  return {
    items: res.items,
    total: res.total,
  };
});
