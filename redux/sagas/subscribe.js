import { put, takeLatest } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import { actionTypes } from 'redux/actions/actionTypes';
import { API } from 'utils/api';
import { setDataToLocalStorageWithExpire, hoursToMs } from 'utils/helper';
import gaHelper from 'utils/ga';
import errorHelper from 'utils/error';

ObjectAssign.polyfill();
es6promise.polyfill();

function* subscribe({ payload: { pathname, ...dataToSend } }) {
  try {
    const { data } = yield API.subscribe(dataToSend);

    gaHelper.trackEvent(
      'Subscribe',
      'Send',
      pathname,
    );

    setDataToLocalStorageWithExpire('isSubscribed', true, hoursToMs(24));
    yield put({ type: actionTypes.SUBSCRIBE_SUCCESS, payload: data });
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the subscribe function',
    });
    const { response } = error;
    yield put({ type: actionTypes.SUBSCRIBE_FAILED, payload: response });
  }
}

export function* subscribeWatcher() {
  yield takeLatest(actionTypes.SUBSCRIBE_PENDING, subscribe);
}
