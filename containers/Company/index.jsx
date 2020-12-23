import React, { Fragment } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import {
  AboutUs,
  WhatMakesUsSpecial,
  ManagementTeam,
  PhotoGallery,
  Awards,
  Reviews,
} from 'components';
import { reviews } from 'containers/Home/Reviews/utils/data';
import { COMPANY_DESCRIPTION } from 'utils/constants';
import styles from './styles.module.scss';

export const CompanyContainer = ({ introSection }) => (
  <Fragment>
    <Head>
      <title>Company - Yellow</title>
      <meta name="description" content={COMPANY_DESCRIPTION} />
      <meta property="og:title" content="Company - Yellow" />
      <meta property="og:description" content={COMPANY_DESCRIPTION} />
    </Head>
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
