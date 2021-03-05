import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import { selectDesktopLimit, selectMobileLimit } from 'redux/selectors/blog';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import { PAGES } from 'utils/constants';
import { toInt } from 'utils/helper';

export const getInitialBlogProps = async ({
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
