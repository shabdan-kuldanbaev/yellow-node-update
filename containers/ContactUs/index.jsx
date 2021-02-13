import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendEmail } from 'redux/actions/contact';
import { fetchLayoutData } from 'redux/actions/layout';
import {
  selectContacts,
  selectCompanyPhoto,
  selectIsLoadingScreenCompleted,
} from 'redux/selectors/layout';
import {
  FeedbackFormWithTitle,
  Calendar,
  CompanyPeoplePhoto,
  CompanyContacts,
  MetaTags,
  LoadingScreen,
} from 'components';
import { PAGES } from 'utils/constants';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import styles from './styles.module.scss';

const ContactUsContainer = ({
  introSection,
  sendEmail,
  officePhoto,
  peoplePhoto,
  fetchLayoutData: fetchPage,
  isLoadingScreenCompleted,
}) => {
  const { content: officePhotoContent } = getDocumentFields(officePhoto, ['content']);
  const { image: officeImage } = getDocumentFields(
    (officePhotoContent && officePhotoContent[0]) ? officePhotoContent[0] : {},
    ['image'],
  );
  const officeImageUrl = getFileUrl(officeImage);
  const { content: peoplePhotoContent } = getDocumentFields(peoplePhoto, ['content']);
  const { image: peopleImage } = getDocumentFields(
    (peoplePhotoContent && peoplePhotoContent[0]) ? peoplePhotoContent[0] : {},
    ['image'],
  );
  const peopleImageUrl = getFileUrl(peopleImage);

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
    fetchPage({ slug: PAGES.contact });
  }, []);

  return (
    <Fragment>
      <MetaTags page={PAGES.contact} />
      {!isLoadingScreenCompleted ? <LoadingScreen /> : (
        <section ref={introSection} className={styles.contactContainer}>
          <FeedbackFormWithTitle handleOnClick={handleOnClick} />
          <Calendar />
          {peopleImageUrl && <CompanyPeoplePhoto photo={peopleImageUrl} />}
          {officeImageUrl && <CompanyContacts photo={officeImageUrl} />}
        </section>
      ) }
    </Fragment>
  );
};

ContactUsContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  sendEmail: PropTypes.func.isRequired,
  officePhoto: PropTypes.instanceOf(Object).isRequired,
  peoplePhoto: PropTypes.instanceOf(Object).isRequired,
  fetchLayoutData: PropTypes.func.isRequired,
  isLoadingScreenCompleted: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({
    officePhoto: selectContacts(state),
    peoplePhoto: selectCompanyPhoto(state),
    isLoadingScreenCompleted: selectIsLoadingScreenCompleted(state),
  }),
  { sendEmail, fetchLayoutData },
)(ContactUsContainer);
