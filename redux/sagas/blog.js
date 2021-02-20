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
import { fetchContentfulNearbyArticles, fetchContentfulArticles } from 'utils/contentfulUtils';
import { PAGES } from 'utils/constants';

ObjectAssign.polyfill();
es6promise.polyfill();

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
    const { items, total } = yield fetchContentfulArticles({
      order: '-fields.publishedAt',
      'fields.categoryTag[match]': category !== 'latest' ? category : '',
      limit: currentLimit,
      skip,
    });

    yield put({ type: actionTypes.LOAD_ARTICLES_SUCCESS, payload: { items, total } });
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
    const { items } = yield fetchContentfulArticles({
      'fields.slug[ne]': currentArticleSlug,
      'fields.categoryTag[match]': categoryTag,
      limit: currentLimit,
    });

    yield put({ type: actionTypes.LOAD_RELATED_SUCCESS, payload: items });
  } catch (err) {
    yield put({ type: actionTypes.LOAD_RELATED_FAILED, payload: err });
  }
}

function* loadNearbyArticles({ publishedAt }) {
  try {
    const prev = yield fetchContentfulNearbyArticles({ isOlder: true, publishedAt });
    const next = yield fetchContentfulNearbyArticles({ isOlder: false, publishedAt });

    yield put({
      type: actionTypes.LOAD_NEARBY_SUCCESS,
      payload: {
        newerArticle: next.items[0],
        olderArticle: prev.items[0],
      },
    });
  } catch (err) {
    yield put({ type: actionTypes.LOAD_NEARBY_FAILED, payload: err });
  }
}

export function* findArticles({ payload: { value } }) {
  try {
    const { items: resultByKey } = yield fetchContentfulArticles({
      'fields.keyWords[match]': value,
    });
    const { items: resultByBody } = yield fetchContentfulArticles({
      'fields.body[match]': value,
    });
    const { items: resultByOldBody } = yield fetchContentfulArticles({
      'fields.oldBody[match]': value,
    });
    const result = uniqWith(
      [...resultByKey, ...resultByBody, ...resultByOldBody],
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
  currentPage,
  currentLimit,
  category,
  skip,
}) {
  if (slug === PAGES.blog) {
    yield call(loadArticles, {
      currentPage,
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
