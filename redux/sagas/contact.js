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
import { CONTACT_US_PEOPLE_PHOTO_ID, CONTACT_US_OFFICE_PHOTO_ID } from 'utils/constants';
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

function* loadCompanyPeoplePhoto({ payload }) {
  try {
    const photo = yield contentfulClient.getAsset(CONTACT_US_PEOPLE_PHOTO_ID);

    yield put({ type: actionTypes.LOAD_COMPANY_PEOPLE_PHOTO_SUCCESS, payload: photo });
  } catch (err) {
    yield put({ type: actionTypes.LOAD_COMPANY_PEOPLE_PHOTO_FAILED, payload: err });
  }
}

function* loadOfficePhoto({ payload }) {
  try {
    const photo = yield contentfulClient.getAsset(CONTACT_US_OFFICE_PHOTO_ID);

    yield put({ type: actionTypes.LOAD_OFFICE_PHOTO_SUCCESS, payload: photo });
  } catch (err) {
    yield put({ type: actionTypes.LOAD_OFFICE_PHOTO_FAILED, payload: err });
  }
}

export function* sendEmailWatcher() {
  yield all([
    yield takeLatest(actionTypes.SEND_EMAIL_PENDING, sendEmail),
    yield takeLatest(actionTypes.LOAD_COMPANY_PEOPLE_PHOTO_PENDING, loadCompanyPeoplePhoto),
    yield takeLatest(actionTypes.LOAD_OFFICE_PHOTO_PENDING, loadOfficePhoto),
  ]);
}
