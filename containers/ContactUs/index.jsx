import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { selectCompanyPhoto, selectMetaData } from 'redux/selectors/layout';
import CompanyContacts from 'components/ContactUsCommon/CompanyContacts';
import MetaTags from 'components/Common/MetaTags';
import PageHeader from 'components/Common/PageHeader';
import FullLayout from 'components/Layout/FullLayout';
import FeedbackFormWithTitle from 'components/ContactUsCommon/FeedbackFormWithTitle';
import { PAGES } from 'utils/constants';
import {
  getDocumentFields,
  getFileUrl,
  rootUrl,
} from 'utils/helper';
import { microdata } from 'utils/microdata';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import CompanyPlacement from 'components/ContactUsCommon/CompanyPlacement';
import styles from './styles.module.scss';

const CompanyPeoplePhoto = dynamic(() => import('components/ContactUsCommon/CompanyPeoplePhoto'));

const ContactUsContainer = ({
  introSection,
  peoplePhoto,
  metaData,
}) => {
  const { images: peoplePhotoContent } = getDocumentFields(peoplePhoto, ['images']);
  const peopleImageUrl = getFileUrl(get(peoplePhotoContent, '[0]', {}));
  const breadcrumbs = pagesBreadcrumbs.contact();
  const pageMetadata = {
    ...metaData,
    url: `${rootUrl}/contact`,
  };

  return (
    <>
      <MetaTags
        page={PAGES.contact}
        pageMetadata={pageMetadata}
        pageMicrodata={microdata.contact()}
        breadcrumbs={breadcrumbs}
      />
      <FullLayout
        introSection={introSection}
        disableOverflowHiding
      >
        <PageHeader breadcrumbs={breadcrumbs} />
        <div className={styles.pageIntro}>
          <FeedbackFormWithTitle />
          <CompanyContacts />
        </div>
        <CompanyPlacement />
        <CompanyPeoplePhoto photo={peopleImageUrl} />
      </FullLayout>
    </>
  );
};

ContactUsContainer.defaultProps = {
  peoplePhoto: {},
};

ContactUsContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  peoplePhoto: PropTypes.instanceOf(Object),
  metaData: PropTypes.shape({
    metaTitle: PropTypes.string,
    metaDescription: PropTypes.string,
    ogImage: PropTypes.string,
  }).isRequired,
};

export default connect(
  (state) => ({
    peoplePhoto: selectCompanyPhoto(state),
    metaData: selectMetaData(state),
  }),
)(ContactUsContainer);
