import React from 'react';
import { useRouter } from 'next/router';
import CaseStudiesContainer from 'containers/CaseStudies';
import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import { PAGES } from 'utils/constants';
import errorHelper from 'utils/error';

const Project = ({ introSection }) => {
  const { query: { project } } = useRouter();

  return (
    <CaseStudiesContainer
      introSection={introSection}
      type={project}
    />
  );
};

Project.getInitialProps = async ({
  store,
  req,
  query: { project },
}) => {
  try {
    store.dispatch(fetchLayoutData({
      slug: PAGES.project,
      projectSlug: project,
    }));

    if (req) {
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }

    return {};
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the Project.getInitialProps function',
    });
  }
};

export default Project;
