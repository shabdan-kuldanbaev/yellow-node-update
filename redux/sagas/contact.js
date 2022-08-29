import {
  put,
  call,
  takeLatest,
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import { actionTypes } from 'redux/actions/actionTypes';
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

    yield put({ type: actionTypes.SEND_FORM_DATA_SUCCESS, payload: response });
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the sendEmail function',
    });
    yield put({ type: actionTypes.SEND_FORM_DATA_FAILED, payload: error });
  }
}

export function* sendEmailWatcher() {
  yield takeLatest(actionTypes.SEND_FORM_DATA_PENDING, sendEmail);
}
