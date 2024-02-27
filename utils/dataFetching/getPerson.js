import { cache } from 'react';
import { blogClient } from 'utils/contentful/client';
import { handleApiError } from 'utils/error';

export const getPerson = cache(async (slug) => {
  try {
    const response = await blogClient.getEntries({
      contentType: 'person',
      additionalQueryParams: {
        'fields.slug': slug,
      },
    });

    return {
      data: {
        ...response.items[0].fields,
        id: response.items[0].sys.id,
      },
    };
  } catch (e) {
    handleApiError(e);

    return { error: e.message };
  }
});
