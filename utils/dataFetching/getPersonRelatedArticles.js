import { cache } from 'react';
import { blogClient } from 'utils/contentful/client';
import { handleApiError } from 'utils/error';

export const getPersonRelatedArticles = cache(async ({
  id,
  skip,
  limit,
}) => {
  try {
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
      data: {
        items: res.items,
        total: res.total,
      },
    };
  } catch (e) {
    handleApiError(e);

    return { error: e.message };
  }
});
