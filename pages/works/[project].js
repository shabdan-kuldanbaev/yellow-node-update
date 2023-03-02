import React from 'react';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import CaseStudiesContainer from 'containers/CaseStudies';
import PageNotFound from 'containers/PageNotFound';
import { wrapper } from 'redux/store';
import { PAGES } from 'utils/constants';
import errorHelper from 'utils/error';
import { pageFetchingStarted } from 'redux/reducers/layout';

const Project = ({ introSection, statusCode }) => {
  const { query: { project } } = useRouter();

  if (statusCode === 404) {
    return <PageNotFound />;
  }

  return <CaseStudiesContainer introSection={introSection} />;
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, query: { project } }) => {
  try {
    let statusCode = '';
    store.dispatch(pageFetchingStarted({
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

    return {
      props: {
        statusCode,
      },
    };
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the Project.getInitialProps function',
    });
  }
});

export default Project;
