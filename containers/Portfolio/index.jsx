import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectPortfolioProjectsPreview } from 'redux/selectors/layout';
import { fetchLayoutData } from 'redux/actions/layout';
import { Portfolio, MetaTags } from 'components';
import { getDocumentFields } from 'utils/helper';
import { PAGES } from 'utils/constants';
import styles from './styles.module.scss';

const PortfolioContainer = ({
  introSection,
  portfolioProjects,
  fetchLayoutData: fetchPage,
}) => {
  const { content } = getDocumentFields(portfolioProjects, ['content']);

  useEffect(() => {
    fetchPage({ slug: PAGES.portfolio });
  }, []);

  return (
    <Fragment>
      <MetaTags page={PAGES.portfolio} />
      <section ref={introSection} className={styles.portfolio}>
        {content && <Portfolio works={content} />}
      </section>
    </Fragment>
  );
};

PortfolioContainer.defaultProps = {
  portfolioProjects: {},
};

PortfolioContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  portfolioProjects: PropTypes.instanceOf(Object),
  fetchLayoutData: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    portfolioProjects: selectPortfolioProjectsPreview(state),
  }),
  { fetchLayoutData },
)(PortfolioContainer);
