import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { sendEmail } from 'redux/actions/contact';
import { selectContacts, selectCompanyPhoto } from 'redux/selectors/layout';
import {
  FeedbackFormWithTitle,
  CompanyPeoplePhoto,
  CompanyContacts,
  MetaTags,
  PageHeader,
  FullLayout,
} from 'components';
import { PAGES, ROUTES } from 'utils/constants';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { microdata } from 'utils/microdata';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';

const ContactUsContainer = ({
  introSection,
  sendEmail: sendFeedback,
  officePhoto,
  peoplePhoto,
}) => {
  const { images: officePhotoContent } = getDocumentFields(officePhoto, ['images']);
  const officeImageUrl = getFileUrl(get(officePhotoContent, '[0]', {}));

  const { images: peoplePhotoContent } = getDocumentFields(peoplePhoto, ['images']);
  const peopleImageUrl = getFileUrl(get(peoplePhotoContent, '[0]', {}));
  const breadcrumbs = pagesBreadcrumbs.contact();

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
    <Fragment>
      <MetaTags
        page={PAGES.contact}
        pageMicrodata={microdata.contact()}
        breadcrumbs={breadcrumbs}
      />
      <FullLayout introSection={introSection}>
        <PageHeader
          title={ROUTES.contact.title}
          breadcrumbs={breadcrumbs}
        />
        <FeedbackFormWithTitle handleOnClick={handleOnClick} />
        <CompanyPeoplePhoto photo={peopleImageUrl} />
        <CompanyContacts photo={officeImageUrl} />
      </FullLayout>
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
