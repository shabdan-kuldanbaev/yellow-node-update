import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCompanyPage } from 'redux/actions/company';
import { selectTeam, selectSpecialThings, selectPhotoGallery } from 'redux/selectors/company';
import { reviews } from 'containers/Home/Reviews/utils/data';
import {
  AboutUs,
  WhatMakesUsSpecial,
  ManagementTeam,
  PhotoGallery,
  Awards,
  Reviews,
  MetaTags,
} from 'components';
import { PAGES } from 'utils/constants';
import { getDocumentFields } from 'utils/helper';
import styles from './styles.module.scss';

const CompanyContainer = ({
  introSection,
  photosData,
  managementTeam,
  whatMakesSpecial,
  fetchCompanyPage,
}) => {
  const { photos } = getDocumentFields(photosData, ['photos']);
  const { team } = getDocumentFields(managementTeam, ['team']);
  const { specialThings } = getDocumentFields(whatMakesSpecial, ['specialThings']);

  useEffect(() => {
    fetchCompanyPage();
  }, []);

  return (
    <Fragment>
      <MetaTags page={PAGES.company} />
      <section ref={introSection} className={styles.companyContainer}>
        <AboutUs />
        {specialThings && <WhatMakesUsSpecial makingUsSpecial={specialThings} />}
        {team && <ManagementTeam managementTeam={team} />}
      </section>
      {photos && <PhotoGallery photos={photos} />}
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
  photosData: PropTypes.instanceOf(Array).isRequired,
  managementTeam: PropTypes.instanceOf(Object).isRequired,
  whatMakesSpecial: PropTypes.instanceOf(Object).isRequired,
  fetchCompanyPage: PropTypes.func.isRequired,
};

export default connect((state) => ({
  photosData: selectPhotoGallery(state),
  managementTeam: selectTeam(state),
  whatMakesSpecial: selectSpecialThings(state),
}), { fetchCompanyPage })(CompanyContainer);
