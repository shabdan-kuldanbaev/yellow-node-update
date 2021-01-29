import { put, takeLatest } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import { contentfulClient } from 'utils/ContentfulClient';
import { actionTypes } from '../actions/actionTypes';

ObjectAssign.polyfill();
es6promise.polyfill();

function* loadWorks({ payload }) {
  try {
    const { items } = yield contentfulClient.getEntries({
      contentType: payload,
    });

    yield put({ type: actionTypes.LOAD_WORKS_SUCCESS, payload: items[0] });
  } catch (err) {
    yield put({ type: actionTypes.LOAD_WORKS_FAILED, payload: err });
  }
}

export function* loadPortfolioWatcher() {
  yield takeLatest(actionTypes.LOAD_WORKS_PENDING, loadWorks);
}
