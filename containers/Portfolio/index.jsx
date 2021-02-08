import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectPortfolioProjectsPreview, selectIsLoading } from 'redux/selectors/layout';
import { fetchPage } from 'redux/actions/layout';
import {
  Portfolio,
  MetaTags,
  LoadingPage,
} from 'components';
import { getDocumentFields } from 'utils/helper';
import { PAGES } from 'utils/constants';
import styles from './styles.module.scss';

const PortfolioContainer = ({
  introSection,
  portfolioProjects,
  fetchPage,
  isPageLoading,
}) => {
  const { content } = getDocumentFields(portfolioProjects, ['content']);

  useEffect(() => {
    fetchPage(PAGES.portfolio);
  }, []);

  return (
    <Fragment>
      <MetaTags page={PAGES.portfolio} />
      <LoadingPage isLoading={isPageLoading} />
      <section ref={introSection} className={styles.portfolio}>
        {content && <Portfolio works={content} />}
      </section>
    </Fragment>
  );
};

PortfolioContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  portfolioProjects: PropTypes.instanceOf(Object).isRequired,
  isPageLoading: PropTypes.bool.isRequired,
  fetchPage: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    portfolioProjects: selectPortfolioProjectsPreview(state),
    isPageLoading: selectIsLoading(state),
  }), { fetchPage },
)(PortfolioContainer);
