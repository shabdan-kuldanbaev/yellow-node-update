import get from 'lodash/get';
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
    const options = {
      contentType: 'article',
      additionalQueryParams: {
        ...additionalQuery,
      },
      ...params,
    };

    return isPreviewMode
      ? await contentfulPreviewClient.getEntries(options)
      : await contentfulClient.getEntries(options);
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

export const getGraphqlResultTags = (graphqlResult) => get(graphqlResult, 'tagCollection.items', []);

export const getGraphqlResultWorkTypes = (graphqlResult) => get(graphqlResult, 'workTypeCollection.items', []);
