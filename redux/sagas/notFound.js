import { put, call } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import { actionTypes } from 'redux/actions/actionTypes';
import { API } from 'utils/api';

ObjectAssign.polyfill();
es6promise.polyfill();

export function* loadJSONNotFound() {
  try {
    const { data } = yield call(API.getJSONNotFound);

    yield put({ type: actionTypes.GET_JSON_NOT_FOUND_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: actionTypes.GET_JSON_NOT_FOUND_FAILED, payload: err });
  }
}
