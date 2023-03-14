import ObjectAssign from 'es6-object-assign';
import es6promise from 'es6-promise';
import {
  all,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import { articleCleared } from 'redux/reducers/blog';
import { formErrorDismissed } from 'redux/reducers/contact';
import {
  pageFetched,
  pageFetchingFailed,
  pageFetchingStarted,
  pageFetchingSucceeded,
} from 'redux/reducers/layout';
import { PAGES } from 'utils/constants';
import { contentfulClient } from 'utils/contentful/client';
import errorHelper from 'utils/error';

ObjectAssign.polyfill();
es6promise.polyfill();

function* fetchPage({ slug }) {
  try {
    const { items } = yield contentfulClient.getEntries({
      contentType: 'page',
      additionalQueryParams: {
        'fields.slug': slug,
      },
    });

    yield put(pageFetched(items[0]));
  } catch (error) {
    yield put(pageFetchingFailed(error.message));
  }
}

function* fetchPageData({
  payload: {
    slug,
  },
}) {
  try {
    // TODO without clearing current article google analytics sends event two times
    yield put(articleCleared());
    yield put(formErrorDismissed());

    switch (slug) {
    case PAGES.privacyPolicy:
    case PAGES.cookiesPolicy:
    case PAGES.termsAndConditions:
    case PAGES.notFound:
    case PAGES.signatureGenerator:
      yield call(fetchPage, { slug });

      break;
    default: throw new Error('Unexpected case in the fetchPageData function');
    }

    yield put(pageFetchingSucceeded);
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the fetchPageData function',
    });
    yield put(pageFetchingFailed(error.message));
  }
}

export function* fetchPageWatcher() {
  yield all([
    yield takeEvery(pageFetchingStarted, fetchPageData),
  ]);
}
