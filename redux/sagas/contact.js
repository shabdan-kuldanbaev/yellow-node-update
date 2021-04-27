import {
  put,
  call,
  takeLatest,
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import { actionTypes } from 'redux/actions/actionTypes';
import { API } from 'utils/api';
import { getFeedbackFormData, gaSend } from 'utils/helper';

ObjectAssign.polyfill();
es6promise.polyfill();

function* sendEmail({ payload }) {
  try {
    const response = yield call(API.sendEmail, getFeedbackFormData(payload));

    gaSend('event', 'Contact Form', 'Send');

    yield put({ type: actionTypes.SEND_FORM_DATA_SUCCESS, payload: 'response' });
  } catch (err) {
    yield put({ type: actionTypes.SEND_FORM_DATA_FAILED, payload: err });
  }
}

export function* sendEmailWatcher() {
  yield takeLatest(actionTypes.SEND_FORM_DATA_PENDING, sendEmail);
}
