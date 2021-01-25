import {
  put,
  takeLatest,
  all,
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import { contentfulClient } from 'utils/ContentfulClient';
import { getNearby, fetchArticles } from 'utils/contentfulUtils';
import { actionTypes } from 'redux/actions/actionTypes';

ObjectAssign.polyfill();
es6promise.polyfill();

function* getArticle({ payload }) {
  try {
    const article = yield fetchArticles(contentfulClient, {
      'fields.slug[match]': payload,
    });

    yield put({ type: actionTypes.GET_ARTICLE_SUCCESS, payload: article });
  } catch (err) {
    yield put({ type: actionTypes.GET_ARTICLE_FAILED, payload: err });
  }
}

function* loadArticles({ payload: { currentLimit, skip } }) { // TODO add currentCategory
  try {
    const { items, total } = yield fetchArticles(contentfulClient, {
      order: '-fields.publishedAt',
      limit: currentLimit,
      skip,
    });

    yield put({ type: actionTypes.LOAD_ARTICLES_SUCCESS, payload: { items, total } });
  } catch (err) {
    yield put({ type: actionTypes.LOAD_ARTICLES_FAILED, payload: err });
  }
}

function* loadRelatedArticles({ payload: { currentLimit, currentArticleSlug } }) { // TODO add currentCategory
  try {
    const { items } = yield fetchArticles(contentfulClient, {
      'fields.slug[ne]': currentArticleSlug,
      order: '-fields.publishedAt',
      limit: currentLimit,
    });

    yield put({ type: actionTypes.LOAD_RELATED_SUCCESS, payload: items });
  } catch (err) {
    yield put({ type: actionTypes.LOAD_RELATED_FAILED, payload: err });
  }
}

function* loadNearbyArticles({ payload: { createdAt } }) {
  try {
    const prev = yield getNearby({ contentfulClient, isOlder: true, createdAt });
    const next = yield getNearby({ contentfulClient, isOlder: false, createdAt });

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

export function* loadBlogDataWatcher() {
  yield all([
    yield takeLatest(actionTypes.GET_ARTICLE_PENDING, getArticle),
    yield takeLatest(actionTypes.LOAD_ARTICLES_PENDING, loadArticles),
    yield takeLatest(actionTypes.LOAD_RELATED_PENDING, loadRelatedArticles),
    yield takeLatest(actionTypes.LOAD_NEARBY_PENDING, loadNearbyArticles),
  ]);
}
