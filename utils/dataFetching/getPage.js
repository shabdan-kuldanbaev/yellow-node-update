import { cache } from 'react';
import { contentfulClient } from 'utils/contentful/client';
import { handleApiError } from 'utils/error';
import { getFileUrl } from 'utils/helper';

export const getPage = cache(async (slug) => {
  if (!slug || typeof slug !== 'string') {
    return {
      error: 'Wrong slug',
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
    handleApiError(e);

    return { error: e.message };
  }
});

export const getPageWithoutCache = async (slug) => {
  if (!slug || typeof slug !== 'string') {
    return {
      error: 'Wrong slug',
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
    handleApiError(e);

    return { error: e.message };
  }
};
