import {
  put, call, takeLatest, all,
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import { API } from 'utils/api';
import { actionTypes } from '../actions/actionTypes';

ObjectAssign.polyfill();
es6promise.polyfill();

function* sendEmail({ payload }) {
  try {
    const response = yield call(API.sendEmail, payload);

    yield put({ type: actionTypes.SEND_EMAIL_SUCCESS, payload: response });
  } catch (err) {
    yield put({ type: actionTypes.SEND_EMAIL_FAILED, payload: err });
  }
}

export function* sendEmailWatcher() {
  yield all([
    yield takeLatest(actionTypes.SEND_EMAIL_PENDING, sendEmail),
  ]);
}
