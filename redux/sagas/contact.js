import {
  put,
  call,
  takeLatest,
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import ReactGA from 'react-ga';
import { actionTypes } from 'redux/actions/actionTypes';
import { API } from 'utils/api';
import { getFormDataFromFeedback } from 'utils/helper';

ObjectAssign.polyfill();
es6promise.polyfill();

function* sendEmail({ payload }) {
  try {
    const response = yield call(API.sendEmail, getFormDataFromFeedback(payload));

    ReactGA.event({
      category: 'Contact form',
      action: 'Send',
    });

    yield put({ type: actionTypes.SEND_EMAIL_SUCCESS, payload: response });
  } catch (err) {
    yield put({ type: actionTypes.SEND_EMAIL_FAILED, payload: err });
  }
}

export function* sendEmailWatcher() {
  yield takeLatest(actionTypes.SEND_EMAIL_PENDING, sendEmail);
}
