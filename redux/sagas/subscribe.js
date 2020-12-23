import {
  put, call, takeLatest,
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import { API } from 'utils/api';
import { actionTypes } from '../actions/actionTypes';

ObjectAssign.polyfill();
es6promise.polyfill();

function* subscribe({ payload }) {
  try {
    const response = yield call(API.subscribe, payload);

    yield put({ type: actionTypes.SUBSCRIBE_SUCCESS, payload: response });
  } catch (err) {
    yield put({ type: actionTypes.SUBSCRIBE_FAILED, payload: err });
  }
}

export function* subscribeWatcher() {
  yield takeLatest(actionTypes.SUBSCRIBE_PENDING, subscribe);
}
