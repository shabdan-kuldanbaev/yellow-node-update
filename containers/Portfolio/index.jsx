import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectPortfolioProjectsPreview } from 'redux/selectors/layout';
import {
  Portfolio,
  MetaTags,
  Paginator,
} from 'components';
import { getDocumentFields } from 'utils/helper';
import { PAGES, ROUTES } from 'utils/constants';
import styles from './styles.module.scss';

const PortfolioContainer = ({ introSection, portfolioProjects }) => {
  const { content } = getDocumentFields(portfolioProjects, ['content']);

  return (
    <Fragment>
      <MetaTags page={PAGES.portfolio} />
      <section ref={introSection} className={styles.portfolio}>
        {content && <Portfolio works={content} />}
      </section>
      {/* <Paginator
        pagesCounter={8}
        currentPage={1}
        pageSlug={ROUTES.portfolio.slug}
        className={styles.paginator}
      /> */}
    </Fragment>
  );
};

PortfolioContainer.defaultProps = {
  portfolioProjects: {},
};

PortfolioContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  portfolioProjects: PropTypes.instanceOf(Object),
};

export default connect(
  (state) => ({ portfolioProjects: selectPortfolioProjectsPreview(state) }),
)(PortfolioContainer);
