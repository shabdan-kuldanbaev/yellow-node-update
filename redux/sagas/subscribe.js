import {
  put, call, takeLatest, all,
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import { API } from 'utils/api';
import ApiClient from 'utils/apiBlog'; // TODO remove it
import { actionTypes } from '../actions/actionTypes';

ObjectAssign.polyfill();
es6promise.polyfill();

function* subscribe({ payload }) {
  try {
    const response = yield call(API.subscribe, payload);

    console.log('saga - suscribe');

    yield put({ type: actionTypes.SUBSCRIBE_SUCCESS, payload: response });
  } catch (err) {
    yield put({ type: actionTypes.SUBSCRIBE_FAILED, payload: err });
  }
}
// TODO remove
function* createSubscriber({ payload }) {
  try {
    const email = payload;
    const response = yield ApiClient.post('/subscribers', {
      subscriber: {
        email,
      },
    }); // TODO remove it
    console.log('saga - createSubscriber', response);

    yield put({ type: actionTypes.BLOG_SUBSCRIBE_SUCCESS, payload: response.data });
  } catch (err) {
    yield put({ type: actionTypes.BLOG_SUBSCRIBE_ERROR, payload: err });
  }
}

export function* subscribeWatcher() {
  yield all([
    yield takeLatest(actionTypes.SUBSCRIBE_PENDING, subscribe),
    yield takeLatest(actionTypes.BLOG_SUBSCRIBE_START, createSubscriber),
  ]);
}
