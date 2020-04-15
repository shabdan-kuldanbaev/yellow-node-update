import {
  put, call, takeLatest, all,
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import { api } from 'utils/api';
import { actionTypes } from '../actions/actionTypes';

ObjectAssign.polyfill();
es6promise.polyfill();

function* getPost({ payload }) {
  try {
    const response = yield call(api.getPost, payload);

    yield put({ type: actionTypes.GET_POST_SUCCESS, payload: response });
  } catch (err) {
    yield put({ type: actionTypes.GET_POST_FAILED, payload: err });
  }
}

function* loadPosts({ payload }) {
  try {
    const { page, currentLimit, category } = payload;
    const response = yield call(api.loadPosts, page, currentLimit, category);

    yield put({ type: actionTypes.LOAD_POSTS_SUCCESS, payload: response });
  } catch (err) {
    yield put({ type: actionTypes.LOAD_POSTS_FAILED, payload: err });
  }
}

export function* loadBlogDataWatcher() {
  yield all([
    yield takeLatest(actionTypes.GET_POST_PENDING, getPost),
    yield takeLatest(actionTypes.LOAD_POSTS_PENDING, loadPosts),
  ]);
}
