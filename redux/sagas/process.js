import {
  put,
  call,
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import { actionTypes } from 'redux/actions/actionTypes';
import { API } from 'utils/api';

ObjectAssign.polyfill();
es6promise.polyfill();

export function* loadJSON() {
  try {
    yield put({ type: actionTypes.SET_LOADING_SCREEN_COMPLETED, payload: false });

    const { data } = yield call(API.getJSON);

    yield put({ type: actionTypes.GET_JSON_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: actionTypes.GET_JSON_FAILED, payload: err });
  }
}
