import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendEmail } from 'redux/actions/contact';
import { selectContacts, selectCompanyPhoto } from 'redux/selectors/layout';
import {
  FeedbackFormWithTitle,
  Calendar,
  CompanyPeoplePhoto,
  CompanyContacts,
  MetaTags,
  Breadcrumbs,
  FullLayout,
} from 'components';
import { PAGES } from 'utils/constants';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { microdata } from 'utils/microdata';
import styles from './styles.module.scss';

const ContactUsContainer = ({
  introSection,
  sendEmail: sendFeedback,
  officePhoto,
  peoplePhoto,
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
      description,
      selectedFilesInfo,
      projectBudget,
    ] = args;

    sendFeedback({
      name: fullName,
      email,
      description,
      attachments: selectedFilesInfo,
      projectBudget,
    });
  };

  return (
    <FullLayout>
      <MetaTags
        page={PAGES.contact}
        microdata={microdata.contact()}
      />
      <section
        ref={introSection}
        className={styles.contactContainer}
      >
        <Breadcrumbs className={styles.breadcrumbs} />
        <FeedbackFormWithTitle handleOnClick={handleOnClick} />
        <Calendar />
        <CompanyPeoplePhoto photo={peopleImageUrl} />
        <CompanyContacts photo={officeImageUrl} />
      </section>
    </FullLayout>
  );
};

ContactUsContainer.defaultProps = {
  officePhoto: {},
  peoplePhoto: {},
};

ContactUsContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  sendEmail: PropTypes.func.isRequired,
  officePhoto: PropTypes.instanceOf(Object),
  peoplePhoto: PropTypes.instanceOf(Object),
};

export default connect(
  (state) => ({
    officePhoto: selectContacts(state),
    peoplePhoto: selectCompanyPhoto(state),
  }),
  { sendEmail },
)(ContactUsContainer);
