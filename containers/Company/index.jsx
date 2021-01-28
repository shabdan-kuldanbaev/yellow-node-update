import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import { loadPhotos } from 'redux/actions/home';
import { loadTeam, loadSpecial } from 'redux/actions/company';
import { selectPhotos } from 'redux/selectors/home';
import { selectTeam, selectSpecialThings } from 'redux/selectors/company';
import { PAGES } from 'utils/constants';
import { getDocumentFields } from 'utils/helper';
import styles from './styles.module.scss';

const CompanyContainer = ({
  introSection,
  photosData,
  loadPhotos,
  managementTeam,
  loadTeam,
  whatMakesSpecial,
  loadSpecial,
}) => {
  const { photos } = getDocumentFields(photosData, ['photos']);

  useEffect(() => {
    loadPhotos();
    loadTeam();
    loadSpecial();
  }, []);

  return (
    <Fragment>
      <MetaTags page={PAGES.company} />
      <section ref={introSection} className={styles.companyContainer}>
        <AboutUs />
        <WhatMakesUsSpecial makingUsSpecial={whatMakesSpecial} />
        {managementTeam && <ManagementTeam managementTeam={managementTeam} />}
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
  loadPhotos: PropTypes.func.isRequired,
  managementTeam: PropTypes.instanceOf(Object).isRequired,
  loadTeam: PropTypes.func.isRequired,
  whatMakesSpecial: PropTypes.instanceOf(Object).isRequired,
  loadSpecial: PropTypes.func.isRequired,
};

export default connect((state) => ({
  photosData: selectPhotos(state),
  managementTeam: selectTeam(state),
  whatMakesSpecial: selectSpecialThings(state),
}), { loadPhotos, loadTeam, loadSpecial })(CompanyContainer);
