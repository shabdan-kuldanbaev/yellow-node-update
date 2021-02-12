import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectPortfolioProjectsPreview, selectIsLoadingScreenCompleted } from 'redux/selectors/layout';
import { fetchLayoutData } from 'redux/actions/layout';
import {
  Portfolio,
  MetaTags,
  LoadingScreen,
} from 'components';
import { getDocumentFields } from 'utils/helper';
import { PAGES } from 'utils/constants';
import styles from './styles.module.scss';

const PortfolioContainer = ({
  introSection,
  portfolioProjects,
  fetchLayoutData: fetchPage,
  isLoadingScreenCompleted,
}) => {
  const { content } = getDocumentFields(portfolioProjects, ['content']);

  useEffect(() => {
    fetchPage({ slug: PAGES.portfolio });
  }, []);

  return (
    <Fragment>
      <MetaTags page={PAGES.portfolio} />
      {!isLoadingScreenCompleted ? (
        <LoadingScreen />
      ) : (
        <section ref={introSection} className={styles.portfolio}>
          {content && <Portfolio works={content} />}
        </section>
      ) }
    </Fragment>
  );
};

PortfolioContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  portfolioProjects: PropTypes.instanceOf(Object).isRequired,
  fetchLayoutData: PropTypes.func.isRequired,
  isLoadingScreenCompleted: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({
    portfolioProjects: selectPortfolioProjectsPreview(state),
    isLoadingScreenCompleted: selectIsLoadingScreenCompleted(state),
  }), { fetchLayoutData },
)(PortfolioContainer);
