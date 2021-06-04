import { put, call } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import { actionTypes } from 'redux/actions/actionTypes';
import { API } from 'utils/api';
import errorHelper from 'utils/error';

ObjectAssign.polyfill();
es6promise.polyfill();

export function* loadJSON() {
  try {
    const { data } = yield call(API.getJSON);

    yield put({ type: actionTypes.GET_JSON_SUCCESS, payload: data });
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the loadJSON function',
    });
    yield put({ type: actionTypes.GET_JSON_FAILED, payload: error });
  }
}
