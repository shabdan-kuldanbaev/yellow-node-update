import React from 'react';
import { END } from 'redux-saga';
import TechnicalPageContainer from 'containers/TechnicalPage';
import { fetchLayoutData } from 'redux/actions/layout';
import { PAGES, ROUTES } from 'utils/constants';
import errorHelper from 'utils/error';

const PrivacyPolicy = ({ introSection }) => (
  <TechnicalPageContainer
    introSection={introSection}
    type={PAGES.privacyPolicy}
    title={ROUTES.privacyPolicy.title}
  />
);

PrivacyPolicy.getInitialProps = async ({ store, req }) => {
  try {
    store.dispatch(fetchLayoutData({ slug: PAGES.privacyPolicy }));

    if (req) {
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }

    return {};
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the PrivacyPolicy.getInitialProps function',
    });
  }
};

export default PrivacyPolicy;
