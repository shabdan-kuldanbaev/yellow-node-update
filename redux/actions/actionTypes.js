export const actionTypes = {
  SET_MOBILE_MENU_STATE: 'layout/SET_MOBILE_MENU_STATE',
  SET_MOBILE_CATEGORIES_STATE: 'layout/SET_MOBILE_CATEGORIES_STATE',
  SET_MOBILE_RESOLUTION: 'layout/SET_MOBILE_RESOLUTION',
  SET_TABLET_RESOLUTION: 'layout/SET_TABLET_RESOLUTION',
  SET_FULL_RESOLUTION: 'layout/SET_FULL_RESOLUTION',
  SET_FIRST_PAGE_LOADED: 'layout/SET_FIRST_PAGE_LOADED',
  SET_PAGE_READY_TO_DISPLAY: 'layout/SET_PAGE_READY_TO_DISPLAY',
  /* ------------------------ */
  FETCH_PAGE_SUCCESS: 'layout/FETCH_PAGE_SUCCESS',
  FETCH_PAGE_FAILED: 'layout/FETCH_PAGE_FAILED',
  /* ------------------------ */
  SET_PAGE_READY_TO_DISPLAY_PENDING: 'layout/SET_PAGE_READY_TO_DISPLAY_PENDING',
  SET_PAGE_READY_TO_DISPLAY_SUCCESS: 'layout/SET_PAGE_READY_TO_DISPLAY_SUCCESS',
  SET_PAGE_READY_TO_DISPLAY_FAILED: 'layout/SET_PAGE_READY_TO_DISPLAY_FAILED',
  /* ------------------------ */
  SET_DUCK_PENDING: 'home/SET_DUCK_PENDING',
  SET_DUCK: 'home/SET_DUCK',
  /* ------------------------ */
  SET_SCROLL_OF_ADDED_FOOTER: 'home/SET_SCROLL_OF_ADDED_FOOTER',
  /* ------------------------ */
  GET_ARTICLE_SUCCESS: 'blog/GET_ARTICLE_SUCCESS',
  GET_ARTICLE_FAILED: 'blog/GET_ARTICLE_FAILED',
  /* ------------------------ */
  LOAD_ARTICLES_SUCCESS: 'blog/LOAD_ARTICLES_SUCCESS',
  LOAD_ARTICLES_FAILED: 'blog/LOAD_ARTICLES_FAILED',
  /* ------------------------ */
  LOAD_RELATED_SUCCESS: 'blog/LOAD_RELATED_ARTICLES_SUCCESS',
  LOAD_RELATED_FAILED: 'blog/LOAD_RELATED_ARTICLES_FAILED',
  /* ------------------------ */
  LOAD_NEARBY_SUCCESS: 'blog/LOAD_NEARBY_ARTICLES_SUCCESS',
  LOAD_NEARBY_FAILED: 'blog/LOAD_NEARBY_ARTICLES_FAILED',
  /* ------------------------ */
  CLEAR_FOUND_ARTICLES: 'blog/CLEAR_FOUND_ARTICLES',
  /* ------------------------ */
  FIND_ARTICLES_PENDING: 'blog/FIND_ARTICLES_PENDING',
  FIND_ARTICLES_SUCCESS: 'blog/FIND_ARTICLES_SUCCESS',
  FIND_ARTICLES_FAILED: 'blog/FIND_ARTICLES_FAILED',
  /* ------------------------ */
  GET_PROJECT_PENDING: 'portfolio/GET_PROJECT_PENDING',
  GET_PROJECT_SUCCESS: 'portfolio/GET_PROJECT_SUCCESS',
  GET_PROJECT_FAILED: 'portfolio/GET_PROJECT_FAILED',
  /* ------------------------ */
  SEND_EMAIL_PENDING: 'contact/SEND_EMAIL_PENDING',
  SEND_EMAIL_SUCCESS: 'contact/SEND_EMAIL_SUCCESS',
  SEND_EMAIL_FAILED: 'contact/SEND_EMAIL_FAILED',
  /* ------------------------ */
  SET_IS_CONTACTS_SENT: 'contact/SET_IS_CONTACTS_SENT',
  /* ------------------------ */
  SUBSCRIBE_PENDING: 'subscribe/SUBSCRIBE_PENDING',
  SUBSCRIBE_SUCCESS: 'subscribe/SUBSCRIBE_SUCCESS',
  SUBSCRIBE_FAILED: 'subscribe/SUBSCRIBE_FAILED',
  /* ------------------------ */
  CLEAR_MESSAGE: 'subscribe/CLEAR_MESSAGE',
  SET_IS_SUBSCRIBED: 'subscribe/SET_IS_SUBSCRIBED',
  /* ------------------------ */
  GET_JSON_SUCCESS: 'process/GET_JSON_SUCCESS',
  GET_JSON_FAILED: 'process/GET_JSON_FAILED',
};
