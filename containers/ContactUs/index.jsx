import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  sendEmail,
  loadCompanyPeolpePhoto,
  loadOfficePhoto,
} from 'redux/actions/contact';
import { selectPeoplePhoto, selectOfficePhoto } from 'redux/selectors/contact';
import {
  FeedbackFormWithTitle,
  Calendar,
  CompanyPeoplePhoto,
  CompanyContacts,
  MetaTags,
} from 'components';
import { pages } from 'utils/constants';
import styles from './styles.module.scss';

const ContactUsContainer = ({
  introSection,
  sendEmail,
  loadOfficePhoto,
  officePhoto,
  loadCompanyPeolpePhoto,
  peoplePhoto,
}) => {
  useEffect(() => {
    loadOfficePhoto();
    loadCompanyPeolpePhoto();
  }, []);

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
        <CompanyPeoplePhoto photo={peoplePhoto} />
        <CompanyContacts photo={officePhoto} />
      </section>
    </Fragment>
  );
};

ContactUsContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  sendEmail: PropTypes.func.isRequired,
  loadOfficePhoto: PropTypes.func.isRequired,
  officePhoto: PropTypes.instanceOf(Object).isRequired,
  loadCompanyPeolpePhoto: PropTypes.func.isRequired,
  peoplePhoto: PropTypes.instanceOf(Object).isRequired,
};

export default connect((state) => ({
  officePhoto: selectOfficePhoto(state),
  peoplePhoto: selectPeoplePhoto(state),
}), {
  sendEmail,
  loadCompanyPeolpePhoto,
  loadOfficePhoto,
})(ContactUsContainer);
