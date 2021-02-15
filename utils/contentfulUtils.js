import { contentfulClient } from 'utils/ContentfulClient';

export const fetchContentfulNearbyArticles = async ({ publishedAt, isOlder }) => {
  try {
    return await contentfulClient.getEntries({
      contentType: 'article',
      additionalQueryParams: {
        [`fields.publishedAt[${isOlder ? 'lt' : 'gt'}]`]: publishedAt,
        order: `${isOlder ? '-' : ''}fields.publishedAt`,
      },
      limit: 1,
    });
  } catch (error) {
    console.error('The error catched from fetching the Nearby article: ', error);
  }
};

export const fetchContentfulArticles = async (additionalQuery, params = {}) => {
  try {
    return await contentfulClient.getEntries({
      contentType: 'article',
      additionalQueryParams: {
        ...additionalQuery,
      },
      ...params,
    });
  } catch (error) {
    console.error('Fetch error of articles', error);
  }
};
