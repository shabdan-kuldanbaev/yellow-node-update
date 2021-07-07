import React from 'react';
import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import DraftArticle from 'containers/DraftArticle';
import PageNotFound from 'containers/PageNotFound';
import errorHelper from 'utils/error';
import { PAGES } from 'utils/constants';

const DraftArticleContainer = ({ introSection, statusCode }) => {
  if (statusCode === 404) {
    return <PageNotFound />;
  }

  return <DraftArticle introSection={introSection} />;
};

DraftArticleContainer.getInitialProps = async (ctx) => {
  try {
    const {
      store,
      req,
      query: {
        slug,
      },
      res,
    } = ctx;
    const props = {};

    store.dispatch(fetchLayoutData({
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
};

export default DraftArticleContainer;
