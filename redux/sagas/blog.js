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
import { contentfulClient } from 'utils/ContentfulClient';
import { fetchContentfulArticles } from 'utils/contentfulUtils';
import { PAGES } from 'utils/constants';
import { GRAPHQL_QUERY } from 'utils/graphqlQuery';

ObjectAssign.polyfill();
es6promise.polyfill();

function getGraphqlResultArticles(graphqlResult) {
  return get(graphqlResult, 'articleCollection.items', []);
}

function getGraphqlResultTotalArticlesCount(graphqlResult) {
  return get(graphqlResult, 'articleCollection.total', []);
}

function* getArticle({ articleSlug }) {
  try {
    const article = yield fetchContentfulArticles({
      'fields.slug[match]': articleSlug,
    });

    yield put({ type: actionTypes.GET_ARTICLE_SUCCESS, payload: article });
  } catch (err) {
    yield put({ type: actionTypes.GET_ARTICLE_FAILED, payload: err });
  }
}

export function* loadArticles({
  currentLimit,
  skip,
  category,
}) {
  try {
    const response = yield contentfulClient.graphql(GRAPHQL_QUERY.loadPreviewArticles({
      skip,
      limit: currentLimit,
      order: '[publishedAt_DESC]',
      where: {
        ...(category
          ? { categoryTag: category }
          : { categoryTag_exists: true }
        ),
      },
    }));

    yield put({
      type: actionTypes.LOAD_ARTICLES_SUCCESS,
      payload: {
        items: getGraphqlResultArticles(response),
        total: getGraphqlResultTotalArticlesCount(response),
      },
    });
  } catch (err) {
    yield put({ type: actionTypes.LOAD_ARTICLES_FAILED, payload: err });
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
  } catch (err) {
    yield put({ type: actionTypes.LOAD_RELATED_FAILED, payload: err });
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
  } catch (err) {
    yield put({ type: actionTypes.LOAD_NEARBY_FAILED, payload: err });
  }
}

export function* findArticles({ payload: { value } }) {
  try {
    const findArticlesByValue = async (params) => await contentfulClient.graphql(
      GRAPHQL_QUERY.loadPreviewArticles({
        order: '[publishedAt_DESC]',
        ...params,
      }),
    );

    const [
      resultByKey,
      resultByBody,
      resultByOldBody,
    ] = yield all([
      call(findArticlesByValue, {
        where: { keyWords_contains_some: [value] },
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
        ...getGraphqlResultArticles(resultByKey),
        ...getGraphqlResultArticles(resultByBody),
        ...getGraphqlResultArticles(resultByOldBody),
      ],
      isEqual,
    );

    yield put({ type: actionTypes.FIND_ARTICLES_SUCCESS, payload: result });
  } catch (err) {
    yield put({ type: actionTypes.FIND_ARTICLES_FAILED, payload: err });
  }
}

export function* fetchBlogData({
  slug,
  articleSlug,
  currentLimit,
  category,
  skip,
}) {
  if (slug === PAGES.blog) {
    yield call(loadArticles, {
      currentLimit,
      category,
      skip,
    });
  } else {
    yield call(getArticle, { articleSlug });

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
          currentLimit: 5,
          currentArticleSlug,
          categoryTag,
        }),
      ]);
    }
  }
}
