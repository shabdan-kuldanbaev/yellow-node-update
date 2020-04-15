import {
  put, call, takeLatest, all,
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import { api } from 'utils/api';
import { actionTypes } from '../actions/actionTypes';

ObjectAssign.polyfill();
es6promise.polyfill();

function* getArticle({ payload }) {
  try {
    const response = yield call(api.getArticle, payload);

    yield put({ type: actionTypes.GET_ARTICLE_SUCCESS, payload: response });
  } catch (err) {
    yield put({ type: actionTypes.GET_ARTICLE_FAILED, payload: err });
  }
}

function* loadArticles({ payload }) {
  try {
    const { currentPage, currentLimit, category } = payload;
    const response = yield call(api.loadArticles, currentPage, currentLimit, category);

    yield put({ type: actionTypes.LOAD_ARTICLES_SUCCESS, payload: response });
  } catch (err) {
    yield put({ type: actionTypes.LOAD_ARTICLES_FAILED, payload: err });
  }
}

export function* loadBlogDataWatcher() {
  yield all([
    yield takeLatest(actionTypes.GET_ARTICLE_PENDING, getArticle),
    yield takeLatest(actionTypes.LOAD_ARTICLES_PENDING, loadArticles),
  ]);
}
