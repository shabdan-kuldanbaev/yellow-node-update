import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { selectCompanyPhoto, selectMetaData } from 'redux/selectors/layout';
import {
  FeedbackFormWithTitle,
  CompanyContacts,
  MetaTags,
  PageHeader,
  FullLayout,
} from 'components';
import { PAGES } from 'utils/constants';
import {
  getDocumentFields,
  getFileUrl,
  rootUrl,
} from 'utils/helper';
import { microdata } from 'utils/microdata';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import styles from './styles.module.scss';

const CompanyPlacement = dynamic(() => import('components/ContactUsCommon/CompanyPlacement'));
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
    <Fragment>
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
    </Fragment>
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
