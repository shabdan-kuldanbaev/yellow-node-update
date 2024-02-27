import { cache } from 'react';
import { blogPreviewClient } from 'utils/contentful/client';
import { handleApiError } from 'utils/error';

export const getDraftArticle = cache(async (slug) => {
  if (!slug) {
    return {
      error: 'Wrong argument',
    };
  }

  try {
    const article = (await blogPreviewClient.getEntries({ contentType: 'article', query: { slug } })).items[0];

    return { data: article };
  } catch (e) {
    handleApiError(e);

    return { error: e.message };
  }
});
