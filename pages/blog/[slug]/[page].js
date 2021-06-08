import React from 'react';
import BlogContainer from 'containers/Blog';
import { getInitialBlogProps } from 'utils/blogUtils';

const Blog = ({
  currentPage,
  introSection,
  articlesNumberPerPage,
}) => (
  <BlogContainer
    articlesNumberPerPage={articlesNumberPerPage}
    currentPage={currentPage}
    introSection={introSection}
  />
);

Blog.getInitialProps = async (ctx) => getInitialBlogProps(ctx);

export default Blog;
