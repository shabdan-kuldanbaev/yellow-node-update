import {
  put,
  takeLatest,
  all,
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import { contentfulClient } from 'utils/ContentfulClient';
import { actionTypes } from '../actions/actionTypes';

ObjectAssign.polyfill();
es6promise.polyfill();

function* loadTeam({ payload }) {
  try {
    const { items } = yield contentfulClient.getEntries({
      contentType: 'managementTeam',
    });

    yield put({ type: actionTypes.LOAD_TEAM_SUCCESS, payload: items[0] });
  } catch (err) {
    yield put({ type: actionTypes.LOAD_TEAM_FAILED, payload: err });
  }
}

function* loadSpecial({ payload }) {
  try {
    const { items } = yield contentfulClient.getEntries({
      contentType: 'whatMakesSpecial',
    });

    yield put({ type: actionTypes.LOAD_SPECIAL_SUCCESS, payload: items[0] });
  } catch (err) {
    yield put({ type: actionTypes.LOAD_SPECIAL_FAILED, payload: err });
  }
}

export function* companyWatcher() {
  yield all([
    yield takeLatest(actionTypes.LOAD_TEAM_PENDING, loadTeam),
    yield takeLatest(actionTypes.LOAD_SPECIAL_PENDING, loadSpecial),
  ]);
}
