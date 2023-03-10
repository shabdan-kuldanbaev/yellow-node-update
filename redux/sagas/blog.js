import {
  put,
  all,
  call,
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import get from 'lodash/get';
import uniqWith from 'lodash/uniqWith';
import isEqual from 'lodash/isEqual';
import {
  articlesListLoadingSucceeded,
  errorOccured,
} from 'redux/reducers/blog';
import { contentfulClient } from 'utils/contentful/client';
import { getBlogGraphqlQuery } from 'utils/blogUtils';
import { GRAPHQL_QUERY } from 'utils/contentful/graphqlQuery';
import { SEARCH_ARTICLES_LIMIT } from 'utils/constants';

ObjectAssign.polyfill();
es6promise.polyfill();

function getGraphqlResultArticles(graphqlResult) {
  return get(graphqlResult, 'articleCollection.items', []);
}

function getGraphqlResultTotalArticlesCount(graphqlResult) {
  return get(graphqlResult, 'articleCollection.total', []);
}

function getGraphqlResultArticlesByTags(graphqlResult) {
  return get(graphqlResult, 'tagCollection.items[0].linkedFrom.articleCollection.items', []);
}

function getGraphqlResultTotalArticlesCountByTags(graphqlResult) {
  return get(graphqlResult, 'tagCollection.items[0].linkedFrom.articleCollection.total', []);
}

const findArticlesByValue = async (params) => await contentfulClient.graphql(
  GRAPHQL_QUERY.loadPreviewArticles({
    order: '[publishedAt_DESC]',
    ...params,
  }),
);

const findArticlesByTagValue = async (params) => await contentfulClient.graphql(
  GRAPHQL_QUERY.loadPreviewArticlesByTags({
    ...params,
  }),
);

export function* loadArticles({
  currentLimit,
  skip,
  category,
  isTagBlog,
}) {
  try {
    const order = '[publishedAt_DESC]';
    const graphqlQuery = getBlogGraphqlQuery({
      limit: currentLimit,
      skip,
      category,
      order,
      isTagBlog,
    });
    const response = yield contentfulClient.graphql(graphqlQuery);

    yield put(articlesListLoadingSucceeded({
      items: isTagBlog
        ? getGraphqlResultArticlesByTags(response)
        : getGraphqlResultArticles(response),
      total: isTagBlog
        ? getGraphqlResultTotalArticlesCountByTags(response)
        : getGraphqlResultTotalArticlesCount(response),
    }));
  } catch (error) {
    yield put(errorOccured(error));
  }
}

export function* findArticles({ payload: { value } }) {
  try {
    const [
      resultByTag,
      resultByTitle,
      resultByBody,
      resultByOldBody,
    ] = yield all([
      call(findArticlesByTagValue, {
        where: { title_contains: [value] },
        limit: SEARCH_ARTICLES_LIMIT,
      }),
      call(findArticlesByValue, {
        where: { title_contains: value },
      }),
      call(findArticlesByValue, {
        where: { body_contains: value },
      }),
      call(findArticlesByValue.items, {
        where: { oldBody_contains: value },
      }),
    ]);

    const result = uniqWith(
      [
        ...getGraphqlResultArticlesByTags(resultByTag),
        ...getGraphqlResultArticles(resultByTitle),
        ...getGraphqlResultArticles(resultByBody),
        ...getGraphqlResultArticles(resultByOldBody),
      ],
      isEqual,
    );

    yield put(articlesListLoadingSucceeded(result));
  } catch (error) {
    yield put(errorOccured(error));
  }
}
