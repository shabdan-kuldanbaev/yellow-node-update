import { cache } from 'react';
import { contentfulClient, fallbackClient } from 'utils/contentful/client';
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
    if (e.message === '404') {
      try {
        const fallbackResponse = await fallbackClient.getEntries({
          contentType: 'page',
          additionalQueryParams: {
            'fields.slug': slug,
          },

        });

        const fallbackData = fallbackResponse.items[0].fields;

        return {
          data: {
            ...fallbackData,
            metaData: {
              metaTitle: fallbackData.metaTitle || '',
              metaDescription: fallbackData.metaDescription || '',
              metaRobots: fallbackData.metaRobots || '',
              ogImage: getFileUrl(fallbackData.ogImage),
            },
          },
        };
      } catch (fallbackError) {
        return { error: fallbackError.message };
      }
    }
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
    if (e.message === '404') {
      try {
        const fallbackResponse = await fallbackClient.getEntries({
          contentType: 'page',
          additionalQueryParams: {
            'fields.slug': slug,
          },

        });
        const fallbackData = fallbackResponse.items[0].fields;

        return {
          data: {
            ...fallbackData,
            metaData: {
              metaTitle: fallbackData.metaTitle || '',
              metaDescription: fallbackData.metaDescription || '',
              metaRobots: fallbackData.metaRobots || '',
              ogImage: getFileUrl(fallbackData.ogImage),
            },
          },
        };
      } catch (fallbackError) {
        return { error: fallbackError.message };
      }
    }
  }
};
