import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { selectCompanyPhoto, selectMetaData } from 'redux/selectors/layout';
import {
  FeedbackFormWithTitle,
  CompanyPeoplePhoto,
  CompanyContacts,
  MetaTags,
  PageHeader,
  FullLayout,
} from 'components';
import { PAGES, ROUTES } from 'utils/constants';
import {
  getDocumentFields,
  getFileUrl,
  rootUrl,
} from 'utils/helper';
import { microdata } from 'utils/microdata';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import styles from './styles.module.scss';
import CompanyPlacement from '../../components/ContactUsCommon/CompanyPlacement';

const ContactUsContainer = ({
  introSection,
  peoplePhoto,
  metaData: {
    metaTitle,
    metaDescription,
  },
}) => {
  const { images: peoplePhotoContent } = getDocumentFields(peoplePhoto, ['images']);
  const peopleImageUrl = getFileUrl(get(peoplePhotoContent, '[0]', {}));
  const breadcrumbs = pagesBreadcrumbs.contact();
  const pageMetadata = {
    metaTitle,
    metaDescription,
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
      <FullLayout introSection={introSection}>
        <PageHeader
          title={ROUTES.contact.title}
          breadcrumbs={breadcrumbs}
        />
        <div className={styles.pageIntro}>
          <FeedbackFormWithTitle />
          <CompanyContacts />
        </div>
        <CompanyPeoplePhoto photo={peopleImageUrl} />
        <CompanyPlacement />
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
  }).isRequired,
};

export default connect(
  (state) => ({
    peoplePhoto: selectCompanyPhoto(state),
    metaData: selectMetaData(state),
  }),
)(ContactUsContainer);
