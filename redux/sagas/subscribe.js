import {
  put,
  call,
  takeLatest,
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

    localStorage.setItem('isSubscribed', 'true');

    yield put({ type: actionTypes.SUBSCRIBE_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: actionTypes.SUBSCRIBE_FAILED, payload: err.response });
  }
}

export function* subscribeWatcher() {
  yield takeLatest(actionTypes.SUBSCRIBE_PENDING, subscribe);
}
