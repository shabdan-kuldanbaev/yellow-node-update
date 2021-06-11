import React from 'react';
import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import ProjectContainer from 'containers/Project';
import { PageNotFound } from 'containers/PageNotFound';
import { PAGES } from 'utils/constants';
import errorHelper from 'utils/error';

const Project = ({ introSection, statusCode }) => {
  if (statusCode === 404) {
    return <PageNotFound />;
  }

  return <ProjectContainer introSection={introSection} />;
};

Project.getInitialProps = async ({
  store,
  req,
  res,
  query: { project },
}) => {
  try {
    let statusCode = '';
    store.dispatch(fetchLayoutData({
      slug: PAGES.project,
      projectSlug: project,
    }));

    // TODO rewrite it
    if (req) {
      store.dispatch(END);
      await store.sagaTask.toPromise();

      if (!store.getState().portfolio.project.total !== 0) {
        statusCode = 404;

        if (res) {
          res.statusCode = 404;
        }
      }
    }

    return { statusCode };
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the Project.getInitialProps function',
    });
  }
};

export default Project;
