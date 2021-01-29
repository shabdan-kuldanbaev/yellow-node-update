import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendEmail, fetchContactPage } from 'redux/actions/contact';
import { selectPeoplePhoto, selectOfficePhoto } from 'redux/selectors/contact';
import {
  FeedbackFormWithTitle,
  Calendar,
  CompanyPeoplePhoto,
  CompanyContacts,
  MetaTags,
} from 'components';
import { PAGES } from 'utils/constants';
import styles from './styles.module.scss';

const ContactUsContainer = ({
  introSection,
  sendEmail,
  officePhoto,
  peoplePhoto,
  fetchContactPage,
}) => {
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

  useEffect(() => {
    fetchContactPage();
  }, []);

  return (
    <Fragment>
      <MetaTags page={PAGES.contact} />
      <section ref={introSection} className={styles.contactContainer}>
        <FeedbackFormWithTitle handleOnClick={handleOnClick} />
        <Calendar />
        {peoplePhoto && <CompanyPeoplePhoto photo={peoplePhoto} />}
        {officePhoto && <CompanyContacts photo={officePhoto} />}
      </section>
    </Fragment>
  );
};

ContactUsContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  sendEmail: PropTypes.func.isRequired,
  officePhoto: PropTypes.instanceOf(Object).isRequired,
  peoplePhoto: PropTypes.instanceOf(Object).isRequired,
  fetchContactPage: PropTypes.func.isRequired,
};

export default connect((state) => ({
  officePhoto: selectOfficePhoto(state),
  peoplePhoto: selectPeoplePhoto(state),
}), {
  sendEmail,
  fetchContactPage,
})(ContactUsContainer);
