import React from 'react';
import BlogContainer from 'containers/Blog';
import { getInitialBlogProps } from 'utils/blogUtils';

const Blog = ({
  tagsList,
  currentPage,
  introSection,
  articlesNumberPerPage,
}) => (
  <BlogContainer
    tagsList={tagsList}
    articlesNumberPerPage={articlesNumberPerPage}
    currentPage={currentPage}
    introSection={introSection}
  />
);

Blog.getInitialProps = async (ctx) => getInitialBlogProps(ctx);

export default Blog;
