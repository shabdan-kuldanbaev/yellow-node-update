import React from 'react';
import DraftArticle from 'containers/DraftArticle';
import { wrapper } from 'redux/store';
import { handleError } from 'utils/error';
import blogApi from 'redux/apis/blog';

const DraftArticleContainer = ({ introSection, ...rest }) => (
  <DraftArticle
    introSection={introSection}
    {...rest}
  />
);

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  try {
    const { query: { slug } } = ctx;

    await store.dispatch(blogApi.endpoints.getDraftArticle.initiate(slug));

    return {
      props: { slug },
    };
  } catch (error) {
    handleError({
      error,
      message: 'Error in the getInitialBlogProps function in DraftArticle',
    });
  }
});

export default DraftArticleContainer;
