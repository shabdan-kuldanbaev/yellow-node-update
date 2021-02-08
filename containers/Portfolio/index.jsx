import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectPortfolioProjectsPreview, selectIsLoading } from 'redux/selectors/layout';
import { pageReadyToDisplay } from 'redux/actions/layout';
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
  pageReadyToDisplay: fetchPage,
  isPageLoading,
}) => {
  const [isAnimationEnded, setIsAnimationEnded] = useState(false);
  const { content } = getDocumentFields(portfolioProjects, ['content']);

  const handleOnAnimationComplete = () => setIsAnimationEnded(true);

  useEffect(() => {
    fetchPage({ slug: PAGES.portfolio });
  }, []);

  return (
    <Fragment>
      <MetaTags page={PAGES.portfolio} />
      { !isAnimationEnded ? (
        <LoadingPage
          isLoading={isPageLoading}
          handleOnAnimationComplete={handleOnAnimationComplete}
        />
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
  isPageLoading: PropTypes.bool.isRequired,
  pageReadyToDisplay: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    portfolioProjects: selectPortfolioProjectsPreview(state),
    isPageLoading: selectIsLoading(state),
  }), { pageReadyToDisplay },
)(PortfolioContainer);
