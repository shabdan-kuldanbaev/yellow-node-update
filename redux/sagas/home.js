import { put, takeLatest } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import { contentfulClient } from 'utils/ContentfulClient';
import { actionTypes } from '../actions/actionTypes';

ObjectAssign.polyfill();
es6promise.polyfill();

function* fetchHomepage({ payload }) {
  try {
    const { items } = yield contentfulClient.getEntries({
      contentType: 'homePage',
    });

    yield put({ type: actionTypes.FETCH_HOMEPAGE_DATA_SUCCESS, payload: items[0] });
  } catch (err) {
    yield put({ type: actionTypes.FETCH_HOMEPAGE_DATA_FAILED, payload: err });
  }
}

export function* loadGalleryoWatcher() {
  yield takeLatest(actionTypes.FETCH_HOMEPAGE_DATA_PENDING, fetchHomepage);
}
