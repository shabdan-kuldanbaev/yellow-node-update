import {
  put,
  call,
  takeLatest,
  all,
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import ReactGA from 'react-ga';
import { API } from 'utils/api';
import { actionTypes } from '../actions/actionTypes';

ObjectAssign.polyfill();
es6promise.polyfill();

function* subscribe({ payload: { email, pathname } }) {
  try {
    const { data } = yield call(API.subscribe, email);

    ReactGA.event({
      category: 'Subscribe',
      action: 'Send',
      label: pathname,
    });

    localStorage.setItem('unique_id', data.unique_id);

    yield put({ type: actionTypes.SUBSCRIBE_SUCCESS, payload: data.message });
  } catch (err) {
    yield put({ type: actionTypes.SUBSCRIBE_FAILED, payload: err.response });
  }
}

function* getSubscriber({ payload }) {
  try {
    const { data } = yield call(API.getSubscriber, payload);

    console.log(data);

    yield put({ type: actionTypes.FETCH_SUBSCRIBER_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: actionTypes.FETCH_SUBSCRIBER_FAILED, payload: err });
  }
}

export function* subscribeWatcher() {
  yield all([
    yield takeLatest(actionTypes.SUBSCRIBE_PENDING, subscribe),
    yield takeLatest(actionTypes.FETCH_SUBSCRIBER_PENDING, getSubscriber),
  ]);
}
