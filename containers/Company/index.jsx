import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import {
  selectManagementTeam,
  selectWhatMakesSpecial,
  selectImageCarousel,
  selectMetaData,
  selectCompanyReviews,
} from 'redux/selectors/layout';
import AboutUs from 'components/CompanyCommon/AboutUs';
import WhatMakesUsSpecial from 'components/CompanyCommon/WhatMakesUsSpecial';
import MetaTags from 'components/Common/MetaTags';
import PageHeader from 'components/Common/PageHeader';
import { PAGES, ROUTES } from 'utils/constants';
import { getDocumentFields, rootUrl } from 'utils/helper';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import { microdata } from 'utils/microdata';
import styles from './styles.module.scss';

const ManagementTeam = dynamic(() => import('components/CompanyCommon/ManagementTeam'));
const PhotoGallery = dynamic(() => import('components/Common/PhotoGallery'));
const ReviewsSection = dynamic(() => import('UI/sections/ReviewsSection'));

const CompanyContainer = ({
  photosData,
  managementTeam,
  whatMakesSpecial,
  metaData,
  companyReviews,
}) => {
  const { contentModules: teamContent } = getDocumentFields(managementTeam, ['contentModules']);
  const { contentModules: specialThingsContent } = getDocumentFields(whatMakesSpecial, ['contentModules']);
  const breadcrumbs = pagesBreadcrumbs.company();
  const pageMetadata = {
    ...metaData,
    url: `${rootUrl}/company`,
  };

  return (
    <>
      <MetaTags
        page={PAGES.company}
        pageMetadata={pageMetadata}
        pageMicrodata={microdata.company()}
        breadcrumbs={breadcrumbs}
      />
      <main className={styles.main}>
        <PageHeader
          breadcrumbsTheme="dark"
          breadcrumbsStyles={styles.breadcrumbsStyles}
          titleStyles={styles.titleStyles}
          title={ROUTES.company.title}
          breadcrumbs={breadcrumbs}
        />
        <AboutUs />
        <WhatMakesUsSpecial makingUsSpecial={specialThingsContent} />
        <ManagementTeam managementTeam={teamContent} />
        <PhotoGallery sectionData={photosData} />
        <ReviewsSection
          section={companyReviews}
          type="company-reviews"
        />
      </main>
    </>
  );
};

CompanyContainer.defaultProps = {
  photosData: {},
  managementTeam: {},
  whatMakesSpecial: {},
};

CompanyContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  photosData: PropTypes.instanceOf(Object),
  managementTeam: PropTypes.instanceOf(Object),
  whatMakesSpecial: PropTypes.instanceOf(Object),
  companyReviews: PropTypes.instanceOf(Object),
  metaData: PropTypes.shape({
    metaTitle: PropTypes.string,
    metaDescription: PropTypes.string,
    ogImage: PropTypes.string,
  }).isRequired,
};

export default connect(
  (state) => ({
    photosData: selectImageCarousel(state),
    managementTeam: selectManagementTeam(state),
    whatMakesSpecial: selectWhatMakesSpecial(state),
    metaData: selectMetaData(state),
    companyReviews: selectCompanyReviews(state),
  }),
)(CompanyContainer);
