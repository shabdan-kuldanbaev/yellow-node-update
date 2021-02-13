import {
  put,
  takeLatest,
  call,
  all,
  select,
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import { contentfulClient } from 'utils/ContentfulClient';
import { DEFAULT_ARTICLES_LIMIT, PAGES } from 'utils/constants';
import {
  findArticles,
  fetchBlogData,
  loadArticles,
} from 'redux/sagas/blog';
import { selectIsFirstHomepageVisit } from 'redux/selectors/home';
import { artificialDelay } from 'utils/helper';
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

function* fetchPageData({
  payload: {
    slug,
    articleSlug,
    currentPage,
    currentLimit,
    category,
    skip,
  },
}) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING_SCREEN_COMPLETED, payload: false });

    const isFirstHomepageVisit = yield select(selectIsFirstHomepageVisit);

    switch (slug) {
    case PAGES.homepage:
      yield all([
        yield call(fetchPage, { payload: slug }),
        yield call(loadArticles, { payload: { currentLimit: DEFAULT_ARTICLES_LIMIT } }),
        ...(!isFirstHomepageVisit ? [yield call(artificialDelay, 4000)] : []),
      ]);
      break;
    case PAGES.blog:
    case PAGES.article:
      yield call(fetchBlogData, {
        payload: {
          slug,
          articleSlug,
          currentPage,
          currentLimit,
          category,
          skip,
        },
      });
      break;
    case PAGES.portfolio:
    case PAGES.contact:
    case PAGES.company:
      yield call(fetchPage, { payload: slug });
      break;
    default: yield put({ type: actionTypes.SET_PAGE_READY_TO_DISPLAY_FAILED });
    }

    yield put({ type: actionTypes.SET_PAGE_READY_TO_DISPLAY_SUCCESS });
  } catch (error) {
    yield put({ type: actionTypes.SET_PAGE_READY_TO_DISPLAY_FAILED });
  }
}

export function* fetchPageWatcher() {
  yield all([
    yield takeLatest(actionTypes.FIND_ARTICLES_PENDING, findArticles),
    yield takeLatest(actionTypes.SET_PAGE_READY_TO_DISPLAY_PENDING, fetchPageData),
  ]);
}
