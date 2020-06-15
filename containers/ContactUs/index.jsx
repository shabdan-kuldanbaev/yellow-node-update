import React from 'react';
import {
  FeedbackFormWithTitle,
  Calendar,
  CompanyPeoplePhoto,
  CompanyContacts,
} from 'components';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export const ContactUsContainer = ({ introSection }) => (
  <section ref={introSection} className={styles.contactContainer}>
    <FeedbackFormWithTitle />
    <Calendar />
    <CompanyPeoplePhoto />
    <CompanyContacts />
  </section>
);

ContactUsContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
};
