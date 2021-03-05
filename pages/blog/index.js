import React from 'react';
import { BlogContainer } from 'containers';
import { getInitialBlogProps } from 'utils/blogUtils';

const Blog = ({ deviceLimit, currentPage }) => (
  <BlogContainer deviceLimit={deviceLimit} currentPage={currentPage} />
);

Blog.getInitialProps = async (ctx) => getInitialBlogProps(ctx);

export default Blog;
