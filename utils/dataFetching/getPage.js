import { cache } from 'react';
import { contentfulClient } from 'utils/contentful/client';
import { getFileUrl } from 'utils/helper';

export const getPage = cache(async (slug) => {
  if (!slug || typeof slug !== 'string') {
    return {
      data: {},
    };
  }

  const response = await contentfulClient.getEntries({
    contentType: 'page',
    additionalQueryParams: {
      'fields.slug': slug,
    },

  });

  const data = response.items[0].fields;

  return {
    ...data,
    metaData: {
      metaTitle: data.metaTitle || '',
      metaDescription: data.metaDescription || '',
      metaRobots: data.metaRobots || '',
      ogImage: getFileUrl(data.ogImage),
    },
  };
});
