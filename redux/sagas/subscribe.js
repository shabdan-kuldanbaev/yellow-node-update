import { put, takeLatest } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import ReactGA from 'react-ga';
import { API } from 'utils/api';
import { setDataToLocalStorageWithExpire, hoursToMs } from 'utils/helper';
import { actionTypes } from '../actions/actionTypes';

ObjectAssign.polyfill();
es6promise.polyfill();

function* subscribe({ payload: { email, pathname } }) {
  try {
    const { data } = yield API.subscribe(email);

    ReactGA.event({
      category: 'Subscribe',
      action: 'Send',
      label: pathname,
    });

    setDataToLocalStorageWithExpire('isSubscribed', true, hoursToMs(24));
    yield put({ type: actionTypes.SUBSCRIBE_SUCCESS, payload: data });
  } catch (err) {
    const { response: { data } } = err;
    yield put({ type: actionTypes.SUBSCRIBE_FAILED, payload: data });
  }
}

export function* subscribeWatcher() {
  yield takeLatest(actionTypes.SUBSCRIBE_PENDING, subscribe);
}
