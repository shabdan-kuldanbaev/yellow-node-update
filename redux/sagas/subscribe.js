import { put, takeLatest } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import { API } from 'utils/api';
import { setDataToLocalStorageWithExpire, hoursToMs } from 'utils/helper';
import gaHelper from 'utils/ga';
import errorHelper from 'utils/error';
import { subscriptionFailed, subscriptionFetchingStarted, subscriptionSucceeded } from 'redux/reducers/subscription';

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
    yield put(subscriptionSucceeded(data));
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the subscribe function',
    });

    const { response } = error;
    yield put(subscriptionFailed(response));
  }
}

export function* subscribeWatcher() {
  yield takeLatest(subscriptionFetchingStarted, subscribe);
}
