import React from 'react';
import { END } from 'redux-saga';
import PortfolioContainer from 'containers/Portfolio';
import { fetchLayoutData } from 'redux/actions/layout';
import { wrapper } from 'redux/store';
import { PAGES } from 'utils/constants';
import errorHelper from 'utils/error';

const Portfolio = ({ introSection }) => <PortfolioContainer introSection={introSection} />;

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  try {
    store.dispatch(fetchLayoutData({ slug: PAGES.portfolio }));

    if (req) {
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }

    return {
      props: {},
    };
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the MLDevelopment.getStaticProps function',
    });
  }
});

export default Portfolio;
