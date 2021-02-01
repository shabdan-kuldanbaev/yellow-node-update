import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  AboutUs,
  WhatMakesUsSpecial,
  ManagementTeam,
  PhotoGallery,
  Awards,
  Reviews,
  MetaTags,
} from 'components';
import { reviews } from 'containers/Home/Reviews/utils/data';
import { PAGES } from 'utils/constants';
import styles from './styles.module.scss';

export const CompanyContainer = ({ introSection }) => (
  <Fragment>
    <MetaTags page={PAGES.company} />
    <section ref={introSection} className={styles.companyContainer}>
      <AboutUs />
      <WhatMakesUsSpecial />
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
