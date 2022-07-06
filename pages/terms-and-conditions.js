import React from 'react';
import { END } from 'redux-saga';
import TechnicalPageContainer from 'containers/TechnicalPage';
import { fetchLayoutData } from 'redux/actions/layout';
import { PAGES, ROUTES } from 'utils/constants';
import errorHelper from 'utils/error';

const TermsAndConditions = ({ introSection }) => (
  <TechnicalPageContainer
    introSection={introSection}
    type={PAGES.termsAndConditions}
    title={ROUTES.termsAndConditions.title}
  />
);

TermsAndConditions.getInitialProps = async ({ store, req }) => {
  try {
    store.dispatch(fetchLayoutData({ slug: PAGES.termsAndConditions }));

    if (req) {
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }

    return {};
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the TermsAndConditions.getInitialProps function',
    });
  }
};

export default TermsAndConditions;
