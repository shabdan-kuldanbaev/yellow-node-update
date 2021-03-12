import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import { selectDesktopLimit, selectMobileLimit } from 'redux/selectors/blog';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import { toInt, isNumeric } from 'utils/helper';
import { PAGES, CATEGORY_SLUGS } from 'utils/constants';

export const dispatchBlogLoading = async ({
  store,
  query: {
    slug: category = 'latest',
    page = 1,
  },
  req,
}) => {
  const currentState = store.getState();
  const currentPage = toInt(page);
  const deviceLimit = selectIsMobileResolutions(currentState)
    ? selectMobileLimit(currentState)
    : selectDesktopLimit(currentState);

  store.dispatch(fetchLayoutData({
    slug: PAGES.blog,
    currentPage,
    currentLimit: deviceLimit,
    category,
    skip: (currentPage - 1) * deviceLimit,
  }));

  if (req) {
    store.dispatch(END);
    await store.sagaTask.toPromise();
  }

  return {
    deviceLimit,
    currentPage,
  };
};

export const getInitialBlogProps = async ({
  store,
  query: {
    slug,
    page,
  },
  req,
}) => {
  if (!slug) {
    return dispatchBlogLoading({
      store,
      req,
      query: {
        page: 1,
        category: 'latest',
      },
    });
  }

  if (isNumeric(slug)) {
    return dispatchBlogLoading({
      store,
      req,
      query: {
        page: slug,
        category: 'latest',
      },
    });
  }

  if (CATEGORY_SLUGS.includes(slug)) {
    return dispatchBlogLoading({
      store,
      req,
      query: {
        page,
        slug,
      },
    });
  }

  store.dispatch(fetchLayoutData({
    articleSlug: slug,
    slug: PAGES.article,
  }));

  if (req) {
    store.dispatch(END);
    await store.sagaTask.toPromise();
  }

  return {};
};
