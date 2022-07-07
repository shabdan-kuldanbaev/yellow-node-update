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
import { GRAPHQL_QUERY } from 'utils/contentful/graphqlQuery';
import { PAGES } from 'utils/constants';

ObjectAssign.polyfill();
es6promise.polyfill();

function getGraphqlResultArticles(graphqlResult) {
  return get(graphqlResult, 'articleCollection.items', []);
}

function getGraphqlResultTotalArticlesCount(graphqlResult) {
  return get(graphqlResult, 'articleCollection.total', []);
}

function getGraphqlResultArticlesByTags(graphqlResult) {
  return get(graphqlResult, 'articalTagCollection.items[0].linkedFrom.articleCollection.items', []);
}

function getGraphqlResultTotalArticlesCountByTags(graphqlResult) {
  return get(graphqlResult, 'articalTagCollection.items[0].linkedFrom.articleCollection.total', []);
}

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

const getGraphqlQuery = ({
  limit, skip, category, slug, order,
}) => {
  if (slug === PAGES.tagBlog) {
    return GRAPHQL_QUERY.loadPreviewArticlesByTags({
      limit,
      where: { slug: category },
    });
  }

  return GRAPHQL_QUERY.loadPreviewArticles({
    skip,
    limit,
    order,
    where: {
      ...(category
        ? { categoryTag: category }
        : { categoryTag_exists: true }
      ),
    },
  });
};

export function* loadArticles({
  currentLimit,
  skip,
  category,
  slug,
}) {
  try {
    const order = category === 'software-development' ? '[title_ASC]' : '[publishedAt_DESC]';
    const graphqlQuery = getGraphqlQuery({
      limit: currentLimit, skip, category, slug, order,
    });
    const response = yield contentfulClient.graphql(graphqlQuery);

    yield put({
      type: actionTypes.LOAD_ARTICLES_SUCCESS,
      payload: {
        items: slug === PAGES.tagBlog
          ? getGraphqlResultArticlesByTags(response)
          : getGraphqlResultArticles(response),
        total: slug === PAGES.tagBlog
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
}) {
  if (slug === PAGES.blog || slug === PAGES.tagBlog) {
    console.log('category', category);
    yield call(loadArticles, {
      currentLimit,
      category,
      skip,
      slug,
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
