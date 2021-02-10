import {
  put,
  takeLatest,
  all,
  call,
  select,
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import get from 'lodash/get';
import { getDocumentFields } from 'utils/helper';
import { fetchContentfulNearbyArticles, fetchContentfulArticles } from 'utils/contentfulUtils';
import { actionTypes } from 'redux/actions/actionTypes';
import { selectArticle } from 'redux/selectors/blog';

ObjectAssign.polyfill();
es6promise.polyfill();

function* getArticle({ payload: { articleSlug } }) {
  try {
    const article = yield fetchContentfulArticles({
      'fields.slug[match]': articleSlug,
    });

    yield put({ type: actionTypes.GET_ARTICLE_SUCCESS, payload: article });
  } catch (err) {
    yield put({ type: actionTypes.GET_ARTICLE_FAILED, payload: err });
  }
}

function* loadArticles({
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

function* loadRelatedArticles({
  payload: {
    currentLimit,
    currentArticleSlug,
    categoryTag,
  },
}) {
  try {
    const { items } = yield fetchContentfulArticles({
      'fields.slug[ne]': currentArticleSlug,
      'fields.categoryTag[match]': categoryTag,
      limit: currentLimit,
    });

    yield put({ type: actionTypes.LOAD_RELATED_SUCCESS, payload: items });
  } catch (err) {
    yield put({ type: actionTypes.LOAD_RELATED_FAILED, payload: err });
  }
}

function* loadNearbyArticles({ payload: { createdAt } }) {
  try {
    const prev = yield fetchContentfulNearbyArticles({ isOlder: true, createdAt });
    const next = yield fetchContentfulNearbyArticles({ isOlder: false, createdAt });

    yield put({
      type: actionTypes.LOAD_NEARBY_SUCCESS,
      payload: {
        newerArticle: next.items[0],
        olderArticle: prev.items[0],
      },
    });

    yield put({
      type: actionTypes.LOAD_NEARBY_SUCCESS,
      payload: {
        newerArticle: next.items[0],
        olderArticle: prev.items[0],
      },
    });
  } catch (err) {
    yield put({ type: actionTypes.LOAD_NEARBY_FAILED, payload: err });
  }
}

function* findArticles({ payload: { value } }) {
  try {
    const { items } = yield fetchContentfulArticles({
      'fields.keyWords[match]': value,
    });

    yield put({ type: actionTypes.FIND_ARTICLES_SUCCESS, payload: items });
  } catch (err) {
    yield put({ type: actionTypes.FIND_ARTICLES_FAILED, payload: err });
  }
}

function* fetchBlogData({
  payload: {
    pageSlug,
    articleSlug,
    currentPage,
    currentLimit,
    category,
    skip,
  },
}) {
  try {
    if (pageSlug === 'blog') {
      yield call(loadArticles, {
        payload: {
          currentPage,
          currentLimit,
          category,
          skip,
        },
      });
    } else {
      yield call(getArticle, { payload: { articleSlug } });

      const article = yield select(selectArticle);

      const {
        slug,
        categoryTag,
        createdAt,
      } = getDocumentFields(
        get(article, 'items[0]', {}),
        ['slug', 'title', 'createdAt', 'categoryTag'],
      );

      yield all([
        yield call(loadNearbyArticles, { payload: { createdAt } }),
        yield call(loadRelatedArticles, {
          payload: {
            currentLimit: 5,
            currentArticleSlug: slug,
            categoryTag,
          },
        }),
      ]);
    }

    yield put({ type: actionTypes.PAGE_READY_TO_DISPLAY_SUCCESS });
  } catch (err) {
    yield put({ type: actionTypes.PAGE_READY_TO_DISPLAY_FAILED, payload: err });
  }
}

export function* loadBlogDataWatcher() {
  yield all([
    yield takeLatest(actionTypes.FIND_ARTICLES_PENDING, findArticles),
    yield takeLatest(actionTypes.FETCH_BLOG_DATA_PENDING, fetchBlogData),
  ]);
}
