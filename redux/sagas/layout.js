import { put, takeLatest } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import { contentfulClient } from 'utils/ContentfulClient';
import { actionTypes } from '../actions/actionTypes';

ObjectAssign.polyfill();
es6promise.polyfill();

function* fetchPage({ payload }) {
  try {
    const { items = null } = yield contentfulClient.getEntries({
      contentType: 'page',
      additionalQueryParams: {
        'fields.slug[match]': payload,
      },
    });

    yield put({ type: actionTypes.FETCH_PAGE_SUCCESS, payload: items });
  } catch (err) {
    yield put({ type: actionTypes.FETCH_PAGE_FAILED, payload: err });
  }
}

// function* fetchHomeArticles({ payload }) {

// };

// function* fetchPageData({ payload }) {

//   if(slug==='homepage') {
//     //fetchPage
//  //fetchHomaArticles
//   }
//     else //fetchPage
// };

export function* fetchPageWatcher() {
  yield takeLatest(actionTypes.FETCH_PAGE_PENDING, fetchPage);
}
