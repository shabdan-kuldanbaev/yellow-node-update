import {
  put,
  call,
  takeLatest,
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import {
  formSendingFailed,
  formSendingStarted,
  formSendingSucceeded,
} from 'redux/reducers/contact';
import { API } from 'utils/api';
import { getFeedbackFormData } from 'utils/helper';
import gaHelper from 'utils/ga';
import errorHelper from 'utils/error';

ObjectAssign.polyfill();
es6promise.polyfill();

function* sendEmail({ payload }) {
  try {
    errorHelper.handleMessage({
      message: `New Contact Form submit: ${JSON.stringify(payload)}`,
    });

    const response = yield call(API.sendEmail, getFeedbackFormData(payload));

    gaHelper.trackEvent('Contact Form', 'Send');

    yield put(formSendingSucceeded(response));
  } catch (error) {
    yield put(formSendingFailed(error));

    errorHelper.handleError({
      error,
      message: 'Error in the sendEmail function',
    });
  }
}

export function* sendEmailWatcher() {
  yield takeLatest(formSendingStarted, sendEmail);
}
