import React from 'react';
import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import { PageNotFound } from 'containers';
import { PAGES } from 'utils/constants';

const NoteFound = () => <PageNotFound />;

NoteFound.getInitialProps = async ({ store, req }) => {
  store.dispatch(fetchLayoutData({ slug: PAGES.notFound }));

  if (req) {
    store.dispatch(END);
    await store.sagaTask.toPromise();
  }

  return {};
};

export default NoteFound;
