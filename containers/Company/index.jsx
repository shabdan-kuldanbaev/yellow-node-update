import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPage } from 'redux/actions/layout';
import {
  selectManagementTeam,
  selectWhatMakesSpecial,
  selectImageCarousel,
  selectIsLoading,
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
  LoadingPage,
} from 'components';
import { PAGES } from 'utils/constants';
import { getDocumentFields } from 'utils/helper';
import styles from './styles.module.scss';

const CompanyContainer = ({
  introSection,
  photosData,
  managementTeam,
  whatMakesSpecial,
  fetchPage,
  isPageLoading,
}) => {
  const { content: carouselContent } = getDocumentFields(photosData, ['content']);
  const { content: teamContent } = getDocumentFields(managementTeam, ['content']);
  const { content: specialThingsContent } = getDocumentFields(whatMakesSpecial, ['content']);

  useEffect(() => {
    fetchPage(PAGES.company);
  }, []);

  return (
    <Fragment>
      <MetaTags page={PAGES.company} />
      <LoadingPage isLoading={isPageLoading} />
      <section ref={introSection} className={styles.companyContainer}>
        <AboutUs />
        {specialThingsContent && <WhatMakesUsSpecial makingUsSpecial={specialThingsContent} />}
        {teamContent && <ManagementTeam managementTeam={teamContent} />}
      </section>
      {carouselContent && <PhotoGallery photos={carouselContent} />}
      <div className={styles.companyReviews}>
        <Reviews reviews={reviews} />
      </div>
      <section className={styles.companyBottom}>
        <Awards />
      </section>
    </Fragment>
  );
};

CompanyContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  photosData: PropTypes.instanceOf(Object).isRequired,
  managementTeam: PropTypes.instanceOf(Object).isRequired,
  whatMakesSpecial: PropTypes.instanceOf(Object).isRequired,
  fetchPage: PropTypes.func.isRequired,
  isPageLoading: PropTypes.bool.isRequired,
};

export default connect((state) => ({
  photosData: selectImageCarousel(state),
  managementTeam: selectManagementTeam(state),
  whatMakesSpecial: selectWhatMakesSpecial(state),
  isPageLoading: selectIsLoading(state),
}), { fetchPage })(CompanyContainer);
