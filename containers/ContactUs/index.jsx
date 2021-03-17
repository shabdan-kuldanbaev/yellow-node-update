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
} from 'components';
import { PAGES, ROUTES } from 'utils/constants';
import {
  getDocumentFields, getFileUrl, rootUrl, getStaticImages,
} from 'utils/helper';
import styles from './styles.module.scss';

const ContactUsContainer = ({
  introSection,
  sendEmail,
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
  const microdata = {
    '@type': 'Organization',
    '@id': 'url',
    name: 'Contacts | Yellow',
    description: 'Do you have an awesome idea? Reach us for a free consultation on how to build a great software product for your business!',
    url: `${rootUrl}${ROUTES.contact.path}`,
    logo: getStaticImages().roundLogo,
    email: 'hi@yellow.systems',
    telephone: '',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Belarus, Minsk',
      postalCode: '220030',
      streetAddress: '5-303 Nemiga street',
    },
  };

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
      files: selectedFiles,
      isSendNDAChecked,
      projectBudget,
    });
  };

  return (
    <Fragment>
      <MetaTags page={PAGES.contact} microdata={microdata} />
      <section ref={introSection} className={styles.contactContainer}>
        <FeedbackFormWithTitle handleOnClick={handleOnClick} />
        <Calendar />
        {peopleImageUrl && <CompanyPeoplePhoto photo={peopleImageUrl} />}
        {officeImageUrl && <CompanyContacts photo={officeImageUrl} />}
      </section>
    </Fragment>
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
