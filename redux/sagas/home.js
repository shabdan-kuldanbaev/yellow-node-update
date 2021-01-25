import { put, takeLatest } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import { contentfulClient } from 'utils/ContentfulClient';
import { actionTypes } from '../actions/actionTypes';

ObjectAssign.polyfill();
es6promise.polyfill();

function* loadPhotos({ payload }) {
  try {
    const { items } = yield contentfulClient.getEntries({
      contentType: 'photoCarousel',
    });

    yield put({ type: actionTypes.LOAD_PHOTOS_SUCCESS, payload: items[0] });
  } catch (err) {
    yield put({ type: actionTypes.LOAD_PHOTOS_FAILED, payload: err });
  }
}

export function* loadGalleryoWatcher() {
  yield takeLatest(actionTypes.LOAD_PHOTOS_PENDING, loadPhotos);
}
