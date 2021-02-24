import React from 'react';
import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import { selectDesktopLimit, selectMobileLimit } from 'redux/selectors/blog';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import { BlogContainer } from 'containers';
import { PAGES } from 'utils/constants';
import { toInt } from 'utils/helper';

const Blog = ({ deviceLimit, currentPage }) => (
  <BlogContainer deviceLimit={deviceLimit} currentPage={currentPage} />
);

Blog.getInitialProps = async ({
  store,
  query: { slug: category, page },
  req,
}) => {
  const currentState = store.getState();
  const desktopLimit = selectDesktopLimit(currentState);
  const mobileLimit = selectMobileLimit(currentState);
  const currentPage = toInt(page);
  const deviceLimit = selectIsMobileResolutions(currentState)
    ? mobileLimit
    : desktopLimit;

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

  return { deviceLimit, currentPage };
};

export default Blog;
