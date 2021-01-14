import {
  put,
  takeLatest,
  all,
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import { contentfulClient } from 'utils/ContentfulClient';
import { actionTypes } from '../actions/actionTypes';

ObjectAssign.polyfill();
es6promise.polyfill();

function* getArticle({ payload }) {
  try {
    const article = yield contentfulClient.getEntries({
      contentType: 'article',
      additionalQueryParams: {
        'fields.slug[match]': payload,
      },
    });

    yield put({ type: actionTypes.GET_ARTICLE_SUCCESS, payload: article });
  } catch (err) {
    yield put({ type: actionTypes.GET_ARTICLE_FAILED, payload: err });
  }
}

function* loadArticles({ payload }) {
  try {
    const { currentLimit, skip } = payload; // TODO add currentCategory

    const loadedArticles = yield contentfulClient.getEntries({
      contentType: 'article',
      additionalQueryParams: {
        limit: currentLimit,
        skip,
      },
      searchType: '[match]',
    });

    yield put({ type: actionTypes.LOAD_ARTICLES_SUCCESS, payload: loadedArticles });
  } catch (err) {
    yield put({ type: actionTypes.LOAD_ARTICLES_FAILED, payload: err });
  }
}

// TODO remove it
function* loadFavoritePosts({ payload }) {
  try {
    const { items } = yield contentfulClient.getEntries({
      contentType: 'article',
      additionalQueryParams: {
        'fields.isFavorite': true,
      },
    });

    yield put({ type: actionTypes.LOAD_FAVORITE_POSTS_SUCCESS, payload: items });
  } catch (err) {
    yield put({ type: actionTypes.LOAD_FAVORITE_POSTS_FAILURE, payload: err });
  }
}

function* loadRelatedArticles({ payload }) {
  try {
    const { currentLimit, currentArticleSlug } = payload;

    const loadedArticles = yield contentfulClient.getEntries({
      contentType: 'article',
      additionalQueryParams: {
        'fields.slug[ne]': currentArticleSlug,
        limit: currentLimit,
      },
    });

    yield put({ type: actionTypes.LOAD_RELATED_SUCCESS, payload: loadedArticles });
  } catch (err) {
    yield put({ type: actionTypes.LOAD_RELATED_FAILED, payload: err });
  }
}

function* loadNearbyArticles({ payload }) {
  try {
    const { createdAt } = payload;

    const prev = yield contentfulClient.getEntries({
      contentType: 'article',
      additionalQueryParams: {
        'fields.createdAt[lt]': createdAt,
      },
      limit: 1,
    });

    const next = yield contentfulClient.getEntries({
      contentType: 'article',
      additionalQueryParams: {
        'fields.createdAt[gt]': createdAt,
      },
      limit: 1,
    });

    yield put({ type: actionTypes.LOAD_NEARBY_SUCCESS, payload: { newerArticle: next.items[0], olderArticle: prev.items[0] } });
  } catch (err) {
    yield put({ type: actionTypes.LOAD_NEARBY_FAILED, payload: err });
  }
}

export function* loadBlogDataWatcher() {
  yield all([
    yield takeLatest(actionTypes.GET_ARTICLE_PENDING, getArticle),
    yield takeLatest(actionTypes.LOAD_ARTICLES_PENDING, loadArticles),
    yield takeLatest(actionTypes.LOAD_RELATED_PENDING, loadRelatedArticles),
    yield takeLatest(actionTypes.LOAD_NEARBY_PENDING, loadNearbyArticles),
    yield takeLatest(actionTypes.LOAD_FAVORITE_POSTS_START, loadFavoritePosts), // TODO remove it
  ]);
}
