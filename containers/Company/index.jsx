import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Reviews } from 'containers';
import {
  AboutUs,
  WhatMakesUsSpecial,
  WeDevelopFor,
  ManagementTeam,
  PhotoGallery,
  Awards,
} from 'components';
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
    <Reviews className={styles.companyReviews} />
    <section className={styles.companyBottom}>
      <Awards />
    </section>
  </Fragment>
);

CompanyContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
};
