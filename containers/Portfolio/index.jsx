import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectPortfolioProjectsPreview, selectMetaData } from 'redux/selectors/layout';
import {
  Portfolio,
  MetaTags,
  Paginator,
  PageHeader,
  FullLayout,
} from 'components';
import { getDocumentFields, rootUrl } from 'utils/helper';
import { PAGES, ROUTES } from 'utils/constants';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import styles from './styles.module.scss';

const PortfolioContainer = ({
  introSection,
  portfolioProjects,
  metaData,
}) => {
  const { contentModules } = getDocumentFields(portfolioProjects, ['contentModules']);
  const breadcrumbs = pagesBreadcrumbs.portfolio();
  const pageMetadata = {
    ...metaData,
    url: `${rootUrl}/works`,
  };

  return (
    <Fragment>
      <MetaTags
        page={PAGES.portfolio}
        breadcrumbs={breadcrumbs}
        pageMetadata={pageMetadata}
      />
      <FullLayout introSection={introSection}>
        <PageHeader
          title={ROUTES.portfolio.title}
          breadcrumbs={breadcrumbs}
        />
        <Portfolio works={contentModules} />
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
  metaData: PropTypes.shape({
    metaTitle: PropTypes.string,
    metaDescription: PropTypes.string,
    ogImage: PropTypes.string,
  }).isRequired,
};

export default connect(
  (state) => ({
    portfolioProjects: selectPortfolioProjectsPreview(state),
    metaData: selectMetaData(state),
  }),
)(PortfolioContainer);
