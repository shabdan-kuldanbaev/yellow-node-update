import React from 'react';
import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import Signature from 'containers/Signature';
import { PAGES } from 'utils/constants';
import errorHelper from 'utils/error';

const SignatureGenerator = ({ introSection }) => <Signature introSection={introSection} />;

SignatureGenerator.getInitialProps = async ({ store, req }) => {
  try {
    store.dispatch(fetchLayoutData({ slug: PAGES.signatureGenerator }));

    if (req) {
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }

    return {};
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the IOSDevelopment.getInitialProps function',
    });
  }
};

export default SignatureGenerator;
