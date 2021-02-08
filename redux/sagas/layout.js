import {
  put, takeLatest, call, all, delay,
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import { contentfulClient } from 'utils/ContentfulClient';
import { fetchContentfulArticles } from 'utils/contentfulUtils';
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

function* fetchHomeArticles({
  payload: {
    currentLimit,
    skip,
    category,
  },
}) {
  try {
    const { items, total } = yield fetchContentfulArticles({
      order: '-fields.publishedAt',
      'fields.categoryTag[match]': category !== 'latest' ? category : '',
      limit: currentLimit,
      skip,
    });

    yield put({ type: actionTypes.LOAD_ARTICLES_SUCCESS, payload: { items, total } });
  } catch (err) {
    yield put({ type: actionTypes.LOAD_ARTICLES_FAILED, payload: err });
  }
}

function* fetchPageData({ payload: { slug, currentLimit } }) {
  try {
    if (slug === 'homepage') {
      yield all([
        yield call(fetchPage, { payload: slug }),
        yield call(fetchHomeArticles, { payload: { currentLimit } }),
      ]);
    } else {
      yield call(fetchPage, { payload: slug });
    }

    yield put({ type: actionTypes.PAGE_READY_TO_DISPLAY_SUCCESS });
  } catch (error) {
    yield put({ type: actionTypes.PAGE_READY_TO_DISPLAY_FAILED });
  }
}

export function* fetchPageWatcher() {
  yield takeLatest(actionTypes.PAGE_READY_TO_DISPLAY_PENDING, fetchPageData);
}
