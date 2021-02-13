import {
  put,
  takeLatest,
  call,
  all,
  select,
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import {
  findArticles,
  fetchBlogData,
  loadArticles,
} from 'redux/sagas/blog';
import { selectIsFirstHomepageVisit } from 'redux/selectors/home';
import { selectIsFirstPageLoaded } from 'redux/selectors/layout';
import { artificialDelay, loadDuck } from 'utils/helper';
import { contentfulClient } from 'utils/ContentfulClient';
import { DEFAULT_ARTICLES_LIMIT, PAGES } from 'utils/constants';
import { actionTypes } from '../actions/actionTypes';

ObjectAssign.polyfill();
es6promise.polyfill();

function* fetchPage({ slug }) {
  try {
    const { items = null } = yield contentfulClient.getEntries({
      contentType: 'page',
      additionalQueryParams: {
        'fields.slug[match]': slug,
      },
    });

    yield put({ type: actionTypes.FETCH_PAGE_SUCCESS, payload: items });
  } catch (err) {
    yield put({ type: actionTypes.FETCH_PAGE_FAILED, payload: err });
  }
}

function* fetchDuck() {
  try {
    const duck = yield loadDuck();

    yield put({ type: actionTypes.SET_DUCK, payload: duck });
  } catch (error) {
    yield put({ type: actionTypes.SET_DUCK, payload: null });
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
    yield put({ type: actionTypes.SET_LOADING_SCREEN_COMPLETED, payload: false });

    switch (slug) {
    case PAGES.homepage: {
      const isFirstHomeVisitAndPageLoaded = !(yield select(selectIsFirstHomepageVisit)) && !(yield select(selectIsFirstPageLoaded));

      yield all([
        yield call(fetchDuck),
        yield call(fetchPage, { slug }),
        yield call(loadArticles, { currentLimit: DEFAULT_ARTICLES_LIMIT }),
        ...(isFirstHomeVisitAndPageLoaded ? [yield call(artificialDelay, 4000)] : []),
      ]);
      break;
    }
    case PAGES.blog:
    case PAGES.article:
      yield call(fetchBlogData, {
        slug,
        articleSlug,
        currentPage,
        currentLimit,
        category,
        skip,
      });
      break;
    case PAGES.portfolio:
    case PAGES.contact:
    case PAGES.company:
      yield call(fetchPage, { slug });
      break;
    default: throw new Error('Unexpected case');
    }

    yield put({ type: actionTypes.SET_PAGE_READY_TO_DISPLAY_SUCCESS });
  } catch (error) {
    const { message } = error;
    yield put({ type: actionTypes.SET_PAGE_READY_TO_DISPLAY_FAILED, payload: message });
  }
}

export function* fetchPageWatcher() {
  yield all([
    yield takeLatest(actionTypes.FIND_ARTICLES_PENDING, findArticles),
    yield takeLatest(actionTypes.SET_PAGE_READY_TO_DISPLAY_PENDING, fetchPageData),
  ]);
}
