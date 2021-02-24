import React from 'react';
import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import { ContactUsContainer } from 'containers';
import { PAGES } from 'utils/constants';

const ContactUs = () => <ContactUsContainer />;

ContactUs.getInitialProps = async ({ store, req }) => {
  store.dispatch(fetchLayoutData({ slug: PAGES.contact }));

  if (req) {
    store.dispatch(END);
    await store.sagaTask.toPromise();
  }

  return {};
};

export default ContactUs;
