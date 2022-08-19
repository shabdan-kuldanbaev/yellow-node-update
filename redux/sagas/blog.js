import {
  put,
  all,
  call,
  select,
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import get from 'lodash/get';
import uniqWith from 'lodash/uniqWith';
import isEqual from 'lodash/isEqual';
import { actionTypes } from 'redux/actions/actionTypes';
import { selectArticle } from 'redux/selectors/blog';
import { getDocumentFields } from 'utils/helper';
import { contentfulClient } from 'utils/contentful/client';
import { fetchContentfulArticles } from 'utils/contentful/helper';
import { getBlogGraphqlQuery } from 'utils/blogUtils';
import { GRAPHQL_QUERY } from 'utils/contentful/graphqlQuery';
import { PAGES, SEARCH_ARTICLES_LIMIT } from 'utils/constants';

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

function* getArticle({ articleSlug, isPreviewMode }) {
  try {
    const article = yield fetchContentfulArticles(
      isPreviewMode,
      { 'fields.slug': articleSlug },
    );

    yield put({ type: actionTypes.GET_ARTICLE_SUCCESS, payload: article });
  } catch (error) {
    yield put({ type: actionTypes.GET_ARTICLE_FAILED, payload: error });
  }
}

export function* loadArticles({
  currentLimit,
  skip,
  category,
  isTagBlog,
}) {
  try {
    const order = category === 'software-development' ? '[title_ASC]' : '[publishedAt_DESC]';
    const graphqlQuery = getBlogGraphqlQuery({
      limit: currentLimit,
      skip,
      category,
      isTagBlog,
      order,
    });
    const response = yield contentfulClient.graphql(graphqlQuery);

    yield put({
      type: actionTypes.LOAD_ARTICLES_SUCCESS,
      payload: {
        items: isTagBlog
          ? getGraphqlResultArticlesByTags(response)
          : getGraphqlResultArticles(response),
        total: isTagBlog
          ? getGraphqlResultTotalArticlesCountByTags(response)
          : getGraphqlResultTotalArticlesCount(response),
      },
    });
  } catch (error) {
    yield put({ type: actionTypes.LOAD_ARTICLES_FAILED, payload: error });
  }
}

function* loadRelatedArticles({
  currentLimit,
  currentArticleSlug,
  categoryTag,
}) {
  try {
    const response = yield contentfulClient.graphql(GRAPHQL_QUERY.getNearbyAndRelatedArticle({
      limit: currentLimit,
      where: {
        categoryTag,
        slug_not: currentArticleSlug,
      },
    }));

    yield put({
      type: actionTypes.LOAD_RELATED_SUCCESS,
      payload: getGraphqlResultArticles(response),
    });
  } catch (error) {
    yield put({ type: actionTypes.LOAD_RELATED_FAILED, payload: error });
  }
}

function* loadNearbyArticles({ publishedAt }) {
  try {
    const prev = yield contentfulClient.graphql(GRAPHQL_QUERY.getNearbyAndRelatedArticle({
      limit: 1,
      order: '[publishedAt_DESC]',
      where: { publishedAt_lt: publishedAt },
    }));
    const next = yield contentfulClient.graphql(GRAPHQL_QUERY.getNearbyAndRelatedArticle({
      limit: 1,
      order: '[publishedAt_ASC]',
      where: { publishedAt_gt: publishedAt },
    }));

    yield put({
      type: actionTypes.LOAD_NEARBY_SUCCESS,
      payload: {
        olderArticle: getGraphqlResultArticles(prev)[0],
        newerArticle: getGraphqlResultArticles(next)[0],
      },
    });
  } catch (error) {
    yield put({ type: actionTypes.LOAD_NEARBY_FAILED, payload: error });
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
      call(findArticlesByValue, {
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

    yield put({ type: actionTypes.FIND_ARTICLES_SUCCESS, payload: result });
  } catch (error) {
    yield put({ type: actionTypes.FIND_ARTICLES_FAILED, payload: error });
  }
}

export function* fetchBlogData({
  slug,
  articleSlug,
  currentLimit,
  category,
  skip,
  isPreviewMode,
  isTagBlog,
}) {
  if (slug === PAGES.blog || isTagBlog) {
    yield call(loadArticles, {
      currentLimit,
      category,
      skip,
      isTagBlog,
    });
  } else {
    yield call(getArticle, { articleSlug, isPreviewMode });

    const article = yield select(selectArticle);
    const {
      slug: currentArticleSlug,
      categoryTag,
      publishedAt,
    } = getDocumentFields(
      get(article, 'items[0]', {}),
      ['slug', 'title', 'publishedAt', 'categoryTag'],
    );

    if (currentArticleSlug && categoryTag && publishedAt) {
      yield all([
        yield call(loadNearbyArticles, { publishedAt }),
        yield call(loadRelatedArticles, {
          currentLimit: 4,
          currentArticleSlug,
          categoryTag,
        }),
      ]);
    }
  }
}
