import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendEmail } from 'redux/actions/contact';
import {
  FeedbackFormWithTitle,
  Calendar,
  CompanyPeoplePhoto,
  CompanyContacts,
} from 'components';
import styles from './styles.module.scss';

const ContactUsContainer = ({ introSection, sendEmail }) => {
  const handleOnClick = (...args) => {
    const [fullName, email, projectDescription, selectedFiles, projectBudget] = args;
    sendEmail({
      fullName,
      email,
      projectDescription,
      selectedFiles,
      projectBudget,
    });
  };

  return (
    <section ref={introSection} className={styles.contactContainer}>
      <FeedbackFormWithTitle handleOnClick={handleOnClick} />
      <Calendar />
      <CompanyPeoplePhoto />
      <CompanyContacts />
    </section>
  );
};

ContactUsContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  sendEmail: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
  }), { sendEmail },
)(ContactUsContainer);
