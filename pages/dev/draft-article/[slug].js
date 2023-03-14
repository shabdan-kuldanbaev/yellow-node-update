import React from 'react';
import { END } from 'redux-saga';
import { pageFetchingStarted } from 'redux/reducers/layout';
import DraftArticle from 'containers/DraftArticle';
import { wrapper } from 'redux/store';
import errorHelper from 'utils/error';
import { PAGES } from 'utils/constants';

const DraftArticleContainer = ({ introSection }) => <DraftArticle introSection={introSection} />;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  try {
    const {
      req,
      query: {
        slug,
      },
      res,
    } = ctx;
    const props = {};

    store.dispatch(pageFetchingStarted({
      articleSlug: slug,
      slug: PAGES.article,
      isPreviewMode: true,
    }));

    if (req) {
      store.dispatch(END);
      await store.sagaTask.toPromise();

      if (store.getState().blog.single.total === 0) {
        props.statusCode = 404;

        if (res) {
          res.statusCode = 404;
        }
      }
    }

    return props;
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the getInitialBlogProps function in DraftArticle',
    });
  }
});

export default DraftArticleContainer;
