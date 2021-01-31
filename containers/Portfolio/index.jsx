import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectPortfolioProjectsPreview, selectIsLoading } from 'redux/selectors/layout';
import { fetchPage } from 'redux/actions/layout';
import {
  Portfolio,
  Loader,
  MetaTags,
} from 'components';
import { getDocumentFields } from 'utils/helper';
import { PAGES } from 'utils/constants';
import styles from './styles.module.scss';

const PortfolioContainer = ({
  introSection,
  portfolioProjects,
  isLoading,
  fetchPage,
}) => {
  const { content } = getDocumentFields(portfolioProjects, ['content']);

  useEffect(() => {
    fetchPage(PAGES.portfolio);
  }, []);

  return (
    <Fragment>
      <MetaTags page={PAGES.portfolio} />
      <section ref={introSection} className={styles.portfolio}>
        <Loader isLoading={!isLoading}>
          {content && <Portfolio works={content} />}
        </Loader>
      </section>
    </Fragment>
  );
};

PortfolioContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  portfolioProjects: PropTypes.instanceOf(Object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchPage: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    portfolioProjects: selectPortfolioProjectsPreview(state),
    isLoading: selectIsLoading(state),
  }), { fetchPage },
)(PortfolioContainer);
