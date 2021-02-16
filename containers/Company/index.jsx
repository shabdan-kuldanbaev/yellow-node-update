import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchLayoutData } from 'redux/actions/layout';
import {
  selectManagementTeam,
  selectWhatMakesSpecial,
  selectImageCarousel,
  selectIsLoadingScreenCompleted,
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
  LoadingScreen,
} from 'components';
import { PAGES } from 'utils/constants';
import { getDocumentFields } from 'utils/helper';
import styles from './styles.module.scss';

const CompanyContainer = ({
  introSection,
  photosData,
  managementTeam,
  whatMakesSpecial,
  fetchLayoutData: fetchPage,
  isLoadingScreenCompleted,
}) => {
  const { content: carouselContent } = getDocumentFields(photosData, ['content']);
  const { content: teamContent } = getDocumentFields(managementTeam, ['content']);
  const { content: specialThingsContent } = getDocumentFields(whatMakesSpecial, ['content']);

  useEffect(() => {
    fetchPage({ slug: PAGES.company });
  }, []);

  return (
    <Fragment>
      <MetaTags page={PAGES.company} />
      {!isLoadingScreenCompleted ? <LoadingScreen /> : (
        <Fragment>
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
      )}
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
  fetchLayoutData: PropTypes.func.isRequired,
  isLoadingScreenCompleted: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({
    photosData: selectImageCarousel(state),
    managementTeam: selectManagementTeam(state),
    whatMakesSpecial: selectWhatMakesSpecial(state),
    isLoadingScreenCompleted: selectIsLoadingScreenCompleted(state),
  }),
  { fetchLayoutData },
)(CompanyContainer);
