import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  AboutUs,
  WhatMakesUsSpecial,
  WeDevelopFor,
  ManagementTeam,
  PhotoGallery,
  Awards,
  Reviews,
} from 'components';
import { reviews } from 'containers/Home/Reviews/utils/data';
import styles from './styles.module.scss';

export const CompanyContainer = ({ introSection }) => (
  <Fragment>
    <section ref={introSection} className={styles.companyContainer}>
      <AboutUs />
      <WhatMakesUsSpecial />
      <WeDevelopFor />
      <ManagementTeam />
    </section>
    <PhotoGallery />
    <div className={styles.companyReviews}>
      <Reviews reviews={reviews} />
    </div>
    <section className={styles.companyBottom}>
      <Awards />
    </section>
  </Fragment>
);

CompanyContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
};
