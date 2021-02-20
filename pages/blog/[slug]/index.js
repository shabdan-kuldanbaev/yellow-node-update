import React from 'react';
import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import { ArticleContainer } from 'containers';
import { PAGES } from 'utils/constants';

const Article = () => (
  <ArticleContainer />
);

Article.getInitialProps = async ({
  store,
  query: { slug },
  req,
}) => {
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

export default Article;
