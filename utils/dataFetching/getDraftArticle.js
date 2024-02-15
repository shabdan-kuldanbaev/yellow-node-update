import { cache } from 'react';
import { blogPreviewClient } from 'utils/contentful/client';

export const getDraftArticle = cache(async (slug) => {
  if (!slug) {
    return {
      error: 'Wrong argument',
    };
  }

  const article = (await blogPreviewClient.getEntries({ contentType: 'article', query: { slug } })).items[0];

  return article;
});
