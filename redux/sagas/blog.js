import {
  put,
  all,
  call,
  select,
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import get from 'lodash/get';
import { getDocumentFields } from 'utils/helper';
import { fetchContentfulNearbyArticles, fetchContentfulArticles } from 'utils/contentfulUtils';
import { PAGES } from 'utils/constants';
import { actionTypes } from 'redux/actions/actionTypes';
import { selectArticle } from 'redux/selectors/blog';

ObjectAssign.polyfill();
es6promise.polyfill();

function* getArticle({ articleSlug }) {
  try {
    const article = yield fetchContentfulArticles({
      'fields.slug[match]': articleSlug,
    });

    yield put({ type: actionTypes.GET_ARTICLE_SUCCESS, payload: article });
  } catch (err) {
    yield put({ type: actionTypes.GET_ARTICLE_FAILED, payload: err });
  }
}

export function* loadArticles({
  currentLimit,
  skip,
  category,
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
  currentLimit,
  currentArticleSlug,
  categoryTag,
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

function* loadNearbyArticles({ createdAt }) {
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
  } catch (err) {
    yield put({ type: actionTypes.LOAD_NEARBY_FAILED, payload: err });
  }
}

export function* findArticles({ payload: { value } }) {
  try {
    const { items } = yield fetchContentfulArticles({
      'fields.keyWords[match]': value,
    });

    yield put({ type: actionTypes.FIND_ARTICLES_SUCCESS, payload: items });
  } catch (err) {
    yield put({ type: actionTypes.FIND_ARTICLES_FAILED, payload: err });
  }
}

export function* fetchBlogData({
  slug,
  articleSlug,
  currentPage,
  currentLimit,
  category,
  skip,
}) {
  if (slug === PAGES.blog) {
    yield call(loadArticles, {
      currentPage,
      currentLimit,
      category,
      skip,
    });
  } else {
    yield call(getArticle, { articleSlug });

    const article = yield select(selectArticle);

    const {
      slug: currentArticleSlug,
      categoryTag,
      createdAt,
    } = getDocumentFields(
      get(article, 'items[0]', {}),
      ['slug', 'title', 'createdAt', 'categoryTag'],
    );

    yield all([
      yield call(loadNearbyArticles, { createdAt }),
      yield call(loadRelatedArticles, {
        currentLimit: 5,
        currentArticleSlug,
        categoryTag,
      }),
    ]);
  }
}
