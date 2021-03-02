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

ObjectAssign.polyfill();
es6promise.polyfill();

function* sendEmail({
  payload: {
    fullName,
    email,
    projectDescription,
    selectedFiles,
    isSendNDAChecked,
    projectBudget,
  },
}) {
  try {
    const formData = new window.FormData();

    [...selectedFiles].map((file) => formData.append('files', file));
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('projectDescription', projectDescription);

    if (isSendNDAChecked) formData.append('isSendNDAChecked', isSendNDAChecked);
    if (projectBudget) formData.append('projectBudget', projectBudget);

    const response = yield call(API.sendEmail, formData);

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
