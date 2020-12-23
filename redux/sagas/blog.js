import {
  put, call, takeLatest, all,
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import { API, axiosTemporaryClient } from 'utils/api';
import { actionTypes } from '../actions/actionTypes';

ObjectAssign.polyfill();
es6promise.polyfill();

function* getArticle({ payload }) {
  try {
    // TODO const response = yield call(API.getArticle, payload);
    const { data } = yield axiosTemporaryClient.get(`posts/${payload}`); // TODO remove it

    yield put({ type: actionTypes.GET_ARTICLE_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: actionTypes.GET_ARTICLE_FAILED, payload: err });
  }
}

function* loadArticles({ payload }) {
  try {
    // TODO const { currentPage, currentLimit, category } = payload;
    // TODO const response = yield call(API.loadArticles, currentPage, currentLimit, category);
    // TODO const fetchedArticles = yield call(API.loadArticles, currentPage, currentLimit, category);
    // TODO const { data: { response } } = fetchedArticles;
    const { data } = yield axiosTemporaryClient.get('/posts'); // TODO remove it

    yield put({ type: actionTypes.LOAD_ARTICLES_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: actionTypes.LOAD_ARTICLES_FAILED, payload: err });
  }
}

// TODO remove it
function* loadFavoritePosts({ payload }) {
  try {
    const { data } = yield axiosTemporaryClient.get('/posts/favorites'); // TODO remove it

    yield put({ type: actionTypes.LOAD_FAVORITE_POSTS_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: actionTypes.LOAD_FAVORITE_POSTS_FAILURE, payload: err });
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

function* loadNearbyArticles({ payload }) {
  try {
    const { name } = payload;
    const response = yield call(API.loadNearbyArticles, name);

    yield put({ type: actionTypes.LOAD_NEARBY_SUCCESS, payload: response });
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
