import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dynamic from 'next/dynamic';
import {
  selectManagementTeam,
  selectWhatMakesSpecial,
  selectImageCarousel,
  selectMetaData,
} from 'redux/selectors/layout';
import { reviews } from 'containers/Home/Reviews/utils/data';
import AboutUs from 'components/CompanyCommon/AboutUs';
import WhatMakesUsSpecial from 'components/CompanyCommon/WhatMakesUsSpecial';
import MetaTags from 'components/Common/MetaTags';
import PageHeader from 'components/Common/PageHeader';
import FullLayout from 'components/Layout/FullLayout';
import { PAGES, ROUTES } from 'utils/constants';
import { getDocumentFields, rootUrl } from 'utils/helper';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import styles from './styles.module.scss';

const ManagementTeam = dynamic(() => import('components/CompanyCommon/ManagementTeam'));
const PhotoGallery = dynamic(() => import('components/Common/PhotoGallery'));
const Reviews = dynamic(() => import('components/Common/Reviews'));
const Awards = dynamic(() => import('components/CompanyCommon/Awards'));

const CompanyContainer = ({
  introSection,
  photosData,
  managementTeam,
  whatMakesSpecial,
  metaData,
}) => {
  const { contentModules: carouselContent } = getDocumentFields(photosData, ['contentModules']);
  const { contentModules: teamContent } = getDocumentFields(managementTeam, ['contentModules']);
  const { contentModules: specialThingsContent } = getDocumentFields(whatMakesSpecial, ['contentModules']);
  const breadcrumbs = pagesBreadcrumbs.company();
  const pageMetadata = {
    ...metaData,
    url: `${rootUrl}/company`,
  };

  return (
    <Fragment>
      <MetaTags
        page={PAGES.company}
        pageMetadata={pageMetadata}
        breadcrumbs={breadcrumbs}
      />
      <FullLayout introSection={introSection}>
        <PageHeader
          title={ROUTES.company.title}
          breadcrumbs={breadcrumbs}
        />
        <AboutUs />
        <WhatMakesUsSpecial makingUsSpecial={specialThingsContent} />
        <ManagementTeam managementTeam={teamContent} />
        {(carouselContent && PhotoGallery) && (
          <FullLayout
            disableMaxWidth
            disableTopPadding
            disableSidePadding
            disableBottomPadding
          >
            <PhotoGallery photos={carouselContent} />
          </FullLayout>
        )}
        <FullLayout
          disableMaxWidth
          disableTopPadding
          disableSidePadding
          disableBottomPadding
        >
          {/* TODO check if this div is needed */}
          <div className={styles.companyReviews}>
            <Reviews reviews={reviews} />
          </div>
        </FullLayout>
        <Awards />
      </FullLayout>
    </Fragment>
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
  }),
)(CompanyContainer);
