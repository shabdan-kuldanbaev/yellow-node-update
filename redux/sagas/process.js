import {
  put,
  call,
  takeLatest,
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import { API } from 'utils/api';
import { actionTypes } from '../actions/actionTypes';

ObjectAssign.polyfill();
es6promise.polyfill();

function* loadJSON({ payload }) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING_SCREEN_COMPLETED, payload: false });

    const { data } = yield call(API.getJSON);

    yield put({ type: actionTypes.GET_JSON_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: actionTypes.GET_JSON_FAILED, payload: err });
  }
}

export function* loadPortfolioWatcher() {
  yield takeLatest(actionTypes.GET_JSON_PENDING, loadJSON);
}
