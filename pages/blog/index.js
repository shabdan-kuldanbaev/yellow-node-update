import React from 'react';
import BlogContainer from 'containers/Blog';
import { wrapper } from 'redux/store';
import { getInitialBlogProps } from 'utils/blogUtils';

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => getInitialBlogProps(store, ctx));

export default BlogContainer;
