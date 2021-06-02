import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectPortfolioProjectsPreview } from 'redux/selectors/layout';
import {
  Portfolio,
  MetaTags,
  Paginator,
  PageHeader,
  FullLayout,
} from 'components';
import { getDocumentFields } from 'utils/helper';
import { PAGES, ROUTES } from 'utils/constants';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import styles from './styles.module.scss';

const PortfolioContainer = ({ introSection, portfolioProjects }) => {
  const { content } = getDocumentFields(portfolioProjects, ['content']);

  return (
    <Fragment>
      <MetaTags
        page={PAGES.portfolio}
        breadcrumbs={pagesBreadcrumbs.portfolio()}
      />
      <FullLayout introSection={introSection}>
        <PageHeader
          title={ROUTES.portfolio.title}
          breadcrumbs={pagesBreadcrumbs.portfolio()}
        />
        <Portfolio works={content} />
        {/* <Paginator
        pagesCounter={8}
        currentPage={1}
        pageSlug={ROUTES.portfolio.slug}
        className={styles.paginator}
      /> */}
      </FullLayout>
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
