import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendEmail } from 'redux/actions/contact';
import {
  FeedbackFormWithTitle,
  Calendar,
  CompanyPeoplePhoto,
  CompanyContacts,
  MetaTags,
} from 'components';
import { pages } from 'utils/constants';
import styles from './styles.module.scss';

const ContactUsContainer = ({ introSection, sendEmail }) => {
  const handleOnClick = (...args) => {
    const [
      fullName,
      email,
      projectDescription,
      selectedFiles,
      isSendNDAChecked,
      projectBudget,
    ] = args;
    sendEmail({
      fullName,
      email,
      projectDescription,
      selectedFiles,
      isSendNDAChecked,
      projectBudget,
    });
  };

  return (
    <Fragment>
      <MetaTags page={pages.contact} />
      <section ref={introSection} className={styles.contactContainer}>
        <FeedbackFormWithTitle handleOnClick={handleOnClick} />
        <Calendar />
        <CompanyPeoplePhoto />
        <CompanyContacts />
      </section>
    </Fragment>
  );
};

ContactUsContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  sendEmail: PropTypes.func.isRequired,
};

export default connect(null, { sendEmail })(ContactUsContainer);
