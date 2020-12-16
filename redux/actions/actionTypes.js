export const actionTypes = {
  SET_MOBILE_MENU_STATE: 'layout/SET_MOBILE_MENU_STATE',
  SET_MOBILE_CATEGORIES_STATE: 'layout/SET_MOBILE_CATEGORIES_STATE',
  SET_MOBILE_RESOLUTION: 'layout/SET_MOBILE_RESOLUTION',
  SET_TABLET_RESOLUTION: 'layout/SET_TABLET_RESOLUTION',
  SET_PAGE_LOADING: 'layout/SET_PAGE_LOADING',
  /* ------------------------ */
  SET_MODEL_LOADING: 'home/SET_MODEL_LOADING',
  SET_SCROLL_OF_ADDED_FOOTER: 'home/SET_SCROLL_OF_ADDED_FOOTER',
  SET_DUCK: 'home/SET_DUCK',
  SET_HOMEPAGE_VISIT: 'home/SET_HOMEPAGE_VISIT',
  SET_FIRST_HOMEPAGE_VISIT: 'home/SET_FIRST_HOMEPAGE_VISIT',
  /* ------------------------ */
  GET_ARTICLE_PENDING: 'blog/GET_ARTICLE_PENDING',
  GET_ARTICLE_SUCCESS: 'blog/GET_ARTICLE_SUCCESS',
  GET_ARTICLE_FAILED: 'blog/GET_ARTICLE_FAILED',
  /* ------------------------ */
  // TODO remove FAVORITE post
  LOAD_FAVORITE_POSTS_START: 'LOAD_FAVORITE_POSTS_START',
  LOAD_FAVORITE_POSTS_SUCCESS: 'LOAD_FAVORITE_POSTS_SUCCESS',
  LOAD_FAVORITE_POSTS_FAILURE: 'LOAD_FAVORITE_POSTS_FAILURE',
  /* ------------------------ */
  LOAD_ARTICLES_PENDING: 'blog/LOAD_ARTICLES_PENDING',
  LOAD_ARTICLES_SUCCESS: 'blog/LOAD_ARTICLES_SUCCESS',
  LOAD_ARTICLES_FAILED: 'blog/LOAD_ARTICLES_FAILED',
  /* ------------------------ */
  LOAD_RELATED_PENDING: 'blog/LOAD_RELATED_ARTICLES_PENDING',
  LOAD_RELATED_SUCCESS: 'blog/LOAD_RELATED_ARTICLES_SUCCESS',
  LOAD_RELATED_FAILED: 'blog/LOAD_RELATED_ARTICLES_FAILED',
  /* ------------------------ */
  LOAD_NEARBY_PENDING: 'blog/LOAD_NEARBY_ARTICLES_PENDING',
  LOAD_NEARBY_SUCCESS: 'blog/LOAD_NEARBY_ARTICLES_SUCCESS',
  LOAD_NEARBY_FAILED: 'blog/LOAD_NEARBY_ARTICLES_FAILED',
  /* ------------------------ */
  SET_TOTAL_ARTICLES_COUNT: 'blog/SET_TOTAL_ARTICLES_COUNT',
  SET_BLOG_STATUS: 'blog/SET_BLOG_STATUS',
  SET_FIRST_VISIT_OF_BLOG: 'blog/SET_FIRST_VISIT_OF_BLOG',
  /* ------------------------ */
  LOAD_WORKS_PENDING: 'portfolio/LOAD_WORKS_PENDING',
  LOAD_WORKS_SUCCESS: 'portfolio/LOAD_WORKS_SUCCESS',
  LOAD_WORKS_FAILED: 'portfolio/LOAD_WORKS_FAILED',
  /* ------------------------ */
  GET_PROJECT_PENDING: 'portfolio/GET_PROJECT_PENDING',
  GET_PROJECT_SUCCESS: 'portfolio/GET_PROJECT_SUCCESS',
  GET_PROJECT_FAILED: 'portfolio/GET_PROJECT_FAILED',
  /* ------------------------ */
  SEND_EMAIL_PENDING: 'contact/SEND_EMAIL_PENDING',
  SEND_EMAIL_SUCCESS: 'contact/SEND_EMAIL_SUCCESS',
  SEND_EMAIL_FAILED: 'contact/SEND_EMAIL_FAILED',
  /* ------------------------ */
  SUBSCRIBE_PENDING: 'subscribe/SUBSCRIBE_PENDING',
  SUBSCRIBE_SUCCESS: 'subscribe/SUBSCRIBE_SUCCESS',
  SUBSCRIBE_FAILED: 'subscribe/SUBSCRIBE_FAILED',
};
