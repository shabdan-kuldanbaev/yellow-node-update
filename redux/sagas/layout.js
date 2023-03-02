import ObjectAssign from 'es6-object-assign';
import es6promise from 'es6-promise';
import {
  all,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import { actionTypes } from 'redux/actions/actionTypes';
import {
  pageFetched,
  pageFetchingFailed,
  pageFetchingStarted,
  pageFetchingSucceeded,
} from 'redux/reducers/layout';
import {
  fetchBlogData,
  findArticles,
  loadArticles,
} from 'redux/sagas/blog';
import { fetchTags, fetchTypes } from 'redux/sagas/portfolio';
import { loadJSON } from 'redux/sagas/process';
import { HOMEPAGE_ARTICLES_LIMIT, PAGES } from 'utils/constants';
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
    articleSlug,
    projectSlug,
    currentLimit,
    category,
    skip,
    isPreviewMode = false,
    isTagBlog = false,
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
      yield all([
        yield call(fetchPage, { slug }),
        yield call(fetchBlogData, {
          slug,
          articleSlug,
          currentLimit,
          category,
          skip,
          isPreviewMode,
          isTagBlog,
        }),
      ]);

      break;
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
      yield call(fetchPage, { slug: projectSlug });

      break;
    case PAGES.portfolio:
      yield all([
        yield call(fetchPage, { slug }),
        yield call(fetchTags),
        yield call(fetchTypes),
      ]);

      break;
    case PAGES.contact:
    case PAGES.company:
    case PAGES.privacyPolicy:
    case PAGES.cookiesPolicy:
    case PAGES.termsAndConditions:
    case PAGES.customChatApp:
    case PAGES.customMobileApp:
    case PAGES.customWebApp:
    case PAGES.designServices:
    case PAGES.developmentServices:
    case PAGES.androidDevelopmentServices:
    case PAGES.mvpDevelopment:
    case PAGES.lendingSoftwareDevelopment:
    case PAGES.cloudDevelopment:
    case PAGES.crossPlatformDevelopmentServices:
    case PAGES.fintechDevelopment:
    case PAGES.erpDevelopment:
    case PAGES.mlDevelopment:
    case PAGES.discoveryPhase:
    case PAGES.devOpsDevelopment:
    case PAGES.aiDevelopment:
    case PAGES.dataScienceDevelopment:
    case PAGES.tradingSoftwareDevelopment:
    case PAGES.prototypingServices:
    case PAGES.notFound:
    case PAGES.signatureGenerator:
      yield call(fetchPage, { slug });

      break;
    case PAGES.process:
      yield all([
        yield call(loadJSON),
        yield call(fetchPage, { slug }),
      ]);

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
    yield takeEvery(actionTypes.FIND_ARTICLES_PENDING, findArticles),
    yield takeEvery(pageFetchingStarted, fetchPageData),
  ]);
}
