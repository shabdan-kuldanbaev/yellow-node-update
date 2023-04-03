import get from 'lodash/get';
import { contentfulClient, contentfulPreviewClient } from 'utils/contentful/client';

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

export function getGraphqlResultArticles(graphqlResult) {
  return get(graphqlResult, 'articleCollection.items', []);
}

export function getGraphqlResultTotalArticlesCount(graphqlResult) {
  return get(graphqlResult, 'articleCollection.total', []);
}

export function getGraphqlResultArticlesByTags(graphqlResult) {
  return get(graphqlResult, 'tagCollection.items[0].linkedFrom.articleCollection.items', []);
}

export function getGraphqlResultTotalArticlesCountByTags(graphqlResult) {
  return get(graphqlResult, 'tagCollection.items[0].linkedFrom.articleCollection.total', []);
}
