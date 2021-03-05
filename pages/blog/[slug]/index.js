import React from 'react';
import { END } from 'redux-saga';
import { useRouter } from 'next/router';
import { fetchLayoutData } from 'redux/actions/layout';
import { ArticleContainer, BlogContainer } from 'containers';
import { PAGES } from 'utils/constants';
import { isNumeric } from 'utils/helper';
import { getInitialBlogProps } from 'utils/blogUtils';

const Article = ({ deviceLimit, currentPage }) => {
  const { query: { slug } } = useRouter();

  return isNumeric(slug)
    ? <BlogContainer deviceLimit={deviceLimit} currentPage={currentPage} />
    : <ArticleContainer />;
};

Article.getInitialProps = async ({
  store,
  query: { slug },
  req,
}) => {
  if (isNumeric(slug)) {
    return getInitialBlogProps({
      store,
      req,
      query: {
        page: slug,
        category: 'latest',
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

export default Article;
