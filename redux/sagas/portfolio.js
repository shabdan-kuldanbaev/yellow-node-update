import {
  put, call, takeLatest, all,
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import { API } from 'utils/api';
import { actionTypes } from '../actions/actionTypes';

ObjectAssign.polyfill();
es6promise.polyfill();

function* loadWorks({ payload }) {
  try {
    const response = yield call(API.loadWorks);

    yield put({ type: actionTypes.LOAD_WORKS_SUCCESS, payload: response });
  } catch (err) {
    yield put({ type: actionTypes.LOAD_WORKS_FAILED, payload: err });
  }
}

function* getProject({ payload }) {
  try {
    const response = yield call(API.getProject);

    yield put({ type: actionTypes.GET_PROJECT_SUCCESS, payload: response });
  } catch (err) {
    yield put({ type: actionTypes.GET_PROJECT_FAILED, payload: err });
  }
}

export function* loadPortfolioWatcher() {
  yield all([
    yield takeLatest(actionTypes.GET_PROJECT_PENDING, getProject),
    yield takeLatest(actionTypes.LOAD_WORKS_PENDING, loadWorks),
  ]);
}
