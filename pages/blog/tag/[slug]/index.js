import React from 'react';
import BlogContainer from 'containers/Blog';
import PageNotFound from 'containers/PageNotFound';
import { getInitialTagBlogProps } from 'utils/blogUtils';

const Blog = ({
  currentPage,
  introSection,
  statusCode,
  articlesNumberPerPage,
}) => {
  if (statusCode === 404) {
    return <PageNotFound />;
  }

  return (
    <BlogContainer
      articlesNumberPerPage={articlesNumberPerPage}
      currentPage={currentPage}
      introSection={introSection}
    />
  );
};

Blog.getInitialProps = async (ctx) => getInitialTagBlogProps(ctx);

export default Blog;
