import { contentfulClient, contentfulPreviewClient } from 'utils/contentful/client';

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

export const fetchContentfulArticles = async (isPreviewMode, additionalQuery, params = {}) => {
  try {
    return isPreviewMode ? await contentfulPreviewClient.getEntries({
      contentType: 'article',
      additionalQueryParams: {
        ...additionalQuery,
      },
      ...params,
    }) : await contentfulClient.getEntries({
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

export const findArticlesByValue = async (value, field = 'keyWords') => {
  try {
    const { items } = await fetchContentfulArticles({
      [`fields.${field}[match]`]: value,
    });

    return items;
  } catch (err) {
    console.error('The error catched from finding articles: ');
  }
};
