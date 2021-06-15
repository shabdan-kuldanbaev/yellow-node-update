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
import { fetchProject } from 'redux/sagas/portfolio';
import { actionTypes } from 'redux/actions/actionTypes';
import { loadJSON } from 'redux/sagas/process';
import { selectIsFirstPageLoaded } from 'redux/selectors/layout';
import { artificialDelay } from 'utils/helper';
import { contentfulClient } from 'utils/contentful/client';
import { HOMEPAGE_ARTICLES_LIMIT, PAGES } from 'utils/constants';
import errorHelper from 'utils/error';

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
  } catch (error) {
    yield put({ type: actionTypes.FETCH_PAGE_FAILED, payload: error });
  }
}

function* fetchDuck({ payload: { isFirstHomepageVisit, loadDuck } }) {
  try {
    const [duck] = yield all([
      yield loadDuck(),
      !isFirstHomepageVisit && !(yield select(selectIsFirstPageLoaded)) && (yield call(artificialDelay, 4000)),
    ]);

    yield put({ type: actionTypes.SET_DUCK, payload: duck });
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the fetchDuck function',
    });
    yield put({ type: actionTypes.SET_DUCK, payload: null });
  }
}

function* fetchPageData({
  payload: {
    slug,
    articleSlug,
    projectSlug,
    currentLimit,
    category,
    skip,
    isPreviewMode = false,
  },
}) {
  try {
    // TODO without clearing current article google analytics sends event two times
    yield put({ type: actionTypes.CLEAR_CURRENT_ARTICLE });
    yield put({ type: actionTypes.CLEAR_CONTACT_FORM_ERROR });

    switch (slug) {
    case PAGES.homepage: {
      yield all([
        yield call(fetchPage, { slug }),
        yield call(loadArticles, { currentLimit: HOMEPAGE_ARTICLES_LIMIT }),
      ]);

      break;
    }
    case PAGES.blog:
    case PAGES.article:
      yield call(fetchBlogData, {
        slug,
        articleSlug,
        currentLimit,
        category,
        skip,
        isPreviewMode,
      });

      break;
    case PAGES.project:
      yield call(fetchProject, { projectSlug });

      break;
    case PAGES.portfolio:
    case PAGES.contact:
    case PAGES.company:
      yield call(fetchPage, { slug });

      break;
    case PAGES.process:
      yield call(loadJSON);

      break;
    case PAGES.notFound:
      break;
    default: throw new Error('Unexpected case in the fetchPageData function');
    }

    yield put({ type: actionTypes.SET_PAGE_READY_TO_DISPLAY_SUCCESS });
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the fetchPageData function',
    });
    yield put({
      type: actionTypes.SET_PAGE_READY_TO_DISPLAY_FAILED,
      payload: error.message,
    });
  }
}

export function* fetchPageWatcher() {
  yield all([
    yield takeLatest(actionTypes.FIND_ARTICLES_PENDING, findArticles),
    yield takeLatest(actionTypes.SET_PAGE_READY_TO_DISPLAY_PENDING, fetchPageData),
    yield takeLatest(actionTypes.SET_DUCK_PENDING, fetchDuck),
  ]);
}
