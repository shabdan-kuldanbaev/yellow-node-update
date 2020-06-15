import React from 'react';
import PropTypes from 'prop-types';
import { SectionTitle } from 'components';
import TestPhoto from './images/bitmap@3x.png';
import styles from './styles.module.scss';

export const CompanyPeoplePhoto = ({ photo }) => (
  <section className={styles.companyPeoplePhoto}>
    <SectionTitle
      title="And come to work with us side by side"
      subtitle="We’re always happy to see you here"
    />
    <div className={styles.imgContainer}>
      <img
        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        alt="CompanyPeoplePhoto"
        style={{ backgroundImage: `url(${photo})` }}
      />
    </div>
  </section>
);

CompanyPeoplePhoto.defaultProps = {
  photo: TestPhoto,
};

CompanyPeoplePhoto.propTypes = {
  photo: PropTypes.string,
};
