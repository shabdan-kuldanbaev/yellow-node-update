import {
  put, call, takeLatest, all,
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import { API } from 'utils/api';
import { actionTypes } from '../actions/actionTypes';

ObjectAssign.polyfill();
es6promise.polyfill();

function* getArticle({ payload }) {
  try {
    const response = yield call(API.getArticle, payload);

    yield put({ type: actionTypes.GET_ARTICLE_SUCCESS, payload: response });
  } catch (err) {
    yield put({ type: actionTypes.GET_ARTICLE_FAILED, payload: err });
  }
}

function* loadArticles({ payload }) {
  try {
    const { currentPage, currentLimit, category } = payload;
    const response = yield call(API.loadArticles, currentPage, currentLimit, category);
    // TODO const fetchedArticles = yield call(API.loadArticles, currentPage, currentLimit, category);
    // TODO const { data: { response } } = fetchedArticles;

    yield put({ type: actionTypes.LOAD_ARTICLES_SUCCESS, payload: response });
  } catch (err) {
    yield put({ type: actionTypes.LOAD_ARTICLES_FAILED, payload: err });
  }
}

function* loadRelatedArticles({ payload }) {
  try {
    const { category } = payload;
    const response = yield call(API.loadRelatedArticles, category);

    yield put({ type: actionTypes.LOAD_RELATED_SUCCESS, payload: response });
  } catch (err) {
    yield put({ type: actionTypes.LOAD_RELATED_FAILED, payload: err });
  }
}

export function* loadBlogDataWatcher() {
  yield all([
    yield takeLatest(actionTypes.GET_ARTICLE_PENDING, getArticle),
    yield takeLatest(actionTypes.LOAD_ARTICLES_PENDING, loadArticles),
    yield takeLatest(actionTypes.LOAD_RELATED_PENDING, loadRelatedArticles),
  ]);
}
