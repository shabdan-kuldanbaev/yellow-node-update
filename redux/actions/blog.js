import { actionTypes } from './actionTypes';

export const getArticle = (payload) => ({
  type: actionTypes.GET_ARTICLE_PENDING,
  payload,
});

export const loadArticles = (payload) => ({
  type: actionTypes.LOAD_ARTICLES_PENDING,
  payload,
});

export const loadRelatedArticles = (payload) => ({
  type: actionTypes.LOAD_RELATED_PENDING,
  payload,
});

export const loadNearbyArticles = (payload) => ({
  type: actionTypes.LOAD_NEARBY_PENDING,
  payload,
});

export const setTotalCount = (payload) => ({
  type: actionTypes.SET_TOTAL_ARTICLES_COUNT,
  payload,
});

export const setBlogStatus = (payload) => ({
  type: actionTypes.SET_BLOG_STATUS,
  payload,
});

export const setFirstVisit = (payload) => ({
  type: actionTypes.SET_FIRST_VISIT_OF_BLOG,
  payload,
});

// TODO remove it
export const loadFavoritePostsStart = () => ({
  type: actionTypes.LOAD_FAVORITE_POSTS_START,
});
