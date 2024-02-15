import { cache } from 'react';
import { blogClient } from 'utils/contentful/client';

export const getPerson = cache(async (slug) => {
  const response = await blogClient.getEntries({
    contentType: 'person',
    additionalQueryParams: {
      'fields.slug': slug,
    },
  });

  return {
    ...response.items[0].fields,
    id: response.items[0].sys.id,
  };
});
