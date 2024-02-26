import { cache } from 'react';
import { contentfulClient } from 'utils/contentful/client';
import { handleError } from 'utils/error';
import { getFileUrl } from 'utils/helper';

export const getPage = cache(async (slug) => {
  if (!slug || typeof slug !== 'string') {
    return {
      data: {},
    };
  }

  try {
    const response = await contentfulClient.getEntries({
      contentType: 'page',
      additionalQueryParams: {
        'fields.slug': slug,
      },

    });

    const data = response.items[0].fields;

    return {
      data: {
        ...data,
        metaData: {
          metaTitle: data.metaTitle || '',
          metaDescription: data.metaDescription || '',
          metaRobots: data.metaRobots || '',
          ogImage: getFileUrl(data.ogImage),
        },
      },
    };
  } catch (e) {
    handleError(e);

    return { error: e.message };
  }
});
