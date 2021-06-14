import React from 'react';
import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import ContactUsContainer from 'containers/ContactUs';
import { PAGES } from 'utils/constants';
import errorHelper from 'utils/error';

const ContactUs = ({ introSection }) => <ContactUsContainer introSection={introSection} />;

ContactUs.getInitialProps = async ({ store, req }) => {
  try {
    store.dispatch(fetchLayoutData({ slug: PAGES.contact }));

    if (req) {
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }

    return {};
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the ContactUs.getInitialProps function',
    });
  }
};

export default ContactUs;
