import {
  put,
  call,
  takeLatest,
  all,
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import ReactGA from 'react-ga';
import { API } from 'utils/api';
import { contentfulClient } from 'utils/ContentfulClient';
import { actionTypes } from '../actions/actionTypes';

ObjectAssign.polyfill();
es6promise.polyfill();

function* sendEmail({ payload }) {
  try {
    const response = yield call(API.sendEmail, payload);

    ReactGA.event({
      category: 'Contact form',
      action: 'Send',
    });

    yield put({ type: actionTypes.SEND_EMAIL_SUCCESS, payload: response });
  } catch (err) {
    yield put({ type: actionTypes.SEND_EMAIL_FAILED, payload: err });
  }
}

function* fetchContactPage({ payload }) {
  try {
    const { items } = yield contentfulClient.getEntries({
      contentType: 'contactPage',
    });

    yield put({ type: actionTypes.FETCH_CONTACT_DATA_SUCCESS, payload: items[0] });
  } catch (err) {
    yield put({ type: actionTypes.FETCH_CONTACT_DATA_FAILED, payload: err });
  }
}

export function* sendEmailWatcher() {
  yield all([
    yield takeLatest(actionTypes.SEND_EMAIL_PENDING, sendEmail),
    yield takeLatest(actionTypes.FETCH_CONTACT_DATA_PENDING, fetchContactPage),
  ]);
}
