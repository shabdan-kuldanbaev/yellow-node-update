import React from 'react';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import CaseStudiesContainer from 'containers/CaseStudies';
import { PageNotFound } from 'containers/PageNotFound';
import { PAGES } from 'utils/constants';
import errorHelper from 'utils/error';

const Project = ({ introSection, statusCode }) => {
  const { query: { project } } = useRouter();

  // TODO: turn it on when Fernway appears on Contentful
  // if (statusCode === 404) {
  //   return <PageNotFound />;
  // }

  return (
    <CaseStudiesContainer
      introSection={introSection}
      currentProject={project}
    />
  );
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

      if (store.getState().portfolio.project.total === 0) {
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
