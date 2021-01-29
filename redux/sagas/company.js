import { put, takeLatest } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import { contentfulClient } from 'utils/ContentfulClient';
import { actionTypes } from '../actions/actionTypes';

ObjectAssign.polyfill();
es6promise.polyfill();

function* fetchCompanyPage({ payload }) {
  try {
    const { items } = yield contentfulClient.getEntries({
      contentType: 'companyPage',
    });

    yield put({ type: actionTypes.FETCH_COMPANY_DATA_SUCCESS, payload: items[0] });
  } catch (err) {
    yield put({ type: actionTypes.FETCH_COMPANY_DATA_FAILED, payload: err });
  }
}

export function* companyWatcher() {
  yield takeLatest(actionTypes.FETCH_COMPANY_DATA_PENDING, fetchCompanyPage);
}
