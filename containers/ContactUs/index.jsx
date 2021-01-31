import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendEmail } from 'redux/actions/contact';
import { fetchPage } from 'redux/actions/layout';
import { selectContacts, selectCompanyPhoto } from 'redux/selectors/layout';
import {
  FeedbackFormWithTitle,
  Calendar,
  CompanyPeoplePhoto,
  CompanyContacts,
  MetaTags,
} from 'components';
import { PAGES } from 'utils/constants';
import { getDocumentFields } from 'utils/helper';
import styles from './styles.module.scss';

const ContactUsContainer = ({
  introSection,
  sendEmail,
  officePhoto,
  peoplePhoto,
  fetchPage,
}) => {
  const { content: officePhotoContent } = getDocumentFields(officePhoto, ['content']);
  const { content: peoplePhotoContent } = getDocumentFields(peoplePhoto, ['content']);

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
    fetchPage('contact');
  }, []);

  return (
    <Fragment>
      <MetaTags page={PAGES.contact} />
      <section ref={introSection} className={styles.contactContainer}>
        <FeedbackFormWithTitle handleOnClick={handleOnClick} />
        <Calendar />
        {peoplePhotoContent && <CompanyPeoplePhoto photo={peoplePhotoContent} />}
        {officePhotoContent && <CompanyContacts photo={officePhotoContent} />}
      </section>
    </Fragment>
  );
};

ContactUsContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  sendEmail: PropTypes.func.isRequired,
  officePhoto: PropTypes.instanceOf(Object).isRequired,
  peoplePhoto: PropTypes.instanceOf(Object).isRequired,
  fetchPage: PropTypes.func.isRequired,
};

export default connect((state) => ({
  officePhoto: selectContacts(state),
  peoplePhoto: selectCompanyPhoto(state),
}), {
  sendEmail,
  fetchPage,
})(ContactUsContainer);
