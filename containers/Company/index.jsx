import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  selectManagementTeam,
  selectWhatMakesSpecial,
  selectImageCarousel,
} from 'redux/selectors/layout';
import { reviews } from 'containers/Home/Reviews/utils/data';
import {
  AboutUs,
  WhatMakesUsSpecial,
  ManagementTeam,
  PhotoGallery,
  Awards,
  Reviews,
  MetaTags,
  FullLayout,
} from 'components';
import { PAGES } from 'utils/constants';
import { getDocumentFields } from 'utils/helper';
import styles from './styles.module.scss';

const CompanyContainer = ({
  introSection,
  photosData,
  managementTeam,
  whatMakesSpecial,
}) => {
  const { content: carouselContent } = getDocumentFields(photosData, ['content']);
  const { content: teamContent } = getDocumentFields(managementTeam, ['content']);
  const { content: specialThingsContent } = getDocumentFields(whatMakesSpecial, ['content']);

  return (
    <FullLayout>
      <MetaTags page={PAGES.company} />
      <section
        ref={introSection}
        className={styles.companyContainer}
      >
        <AboutUs />
        <WhatMakesUsSpecial makingUsSpecial={specialThingsContent} />
        <ManagementTeam managementTeam={teamContent} />
      </section>
      {carouselContent && (
        <FullLayout
          disableMaxWidth
          disableTopPadding
          disableSidePadding
        >
          <PhotoGallery photos={carouselContent} />
        </FullLayout>
      )}
      <FullLayout
        disableMaxWidth
        disableTopPadding
        disableSidePadding
      >
        {/* TODO check if this div is needed */}
        <div className={styles.companyReviews}>
          <Reviews reviews={reviews} />
        </div>
      </FullLayout>
      {/* TODO check if this div is needed */}
      <section className={styles.companyBottom}>
        <Awards />
      </section>
    </FullLayout>
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
};

export default connect(
  (state) => ({
    photosData: selectImageCarousel(state),
    managementTeam: selectManagementTeam(state),
    whatMakesSpecial: selectWhatMakesSpecial(state),
  }),
)(CompanyContainer);
