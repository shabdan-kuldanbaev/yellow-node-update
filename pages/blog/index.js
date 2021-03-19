import React from 'react';
import { BlogContainer } from 'containers';
import { getInitialBlogProps } from 'utils/blogUtils';

const Blog = ({
  deviceLimit,
  currentPage,
  introSection,
}) => (
  <BlogContainer
    deviceLimit={deviceLimit}
    currentPage={currentPage}
    introSection={introSection}
  />
);

Blog.getInitialProps = async (ctx) => getInitialBlogProps(ctx);

export default Blog;
