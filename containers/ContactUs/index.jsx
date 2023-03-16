import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import get from 'lodash/get';
import CompanyContacts from 'components/ContactUsCommon/CompanyContacts';
import MetaTags from 'components/Common/MetaTags';
import PageHeader from 'components/Common/PageHeader';
import FullLayout from 'components/Layout/FullLayout';
import FeedbackFormWithTitle from 'components/ContactUsCommon/FeedbackFormWithTitle';
import { BLOCKS_SLUGS, PAGES } from 'utils/constants';
import {
  findBlock,
  getDocumentFields,
  getFileUrl,
  rootUrl,
} from 'utils/helper';
import { microdata } from 'utils/microdata';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import CompanyPlacement from 'components/ContactUsCommon/CompanyPlacement';
import { useFetchPageQuery } from 'redux/apis/page';
import styles from './styles.module.scss';

const CompanyPeoplePhoto = dynamic(() => import('components/ContactUsCommon/CompanyPeoplePhoto'));

const ContactUsContainer = ({ introSection, type }) => {
  const { data = {} } = useFetchPageQuery(type);
  const {
    contentModules = [],
    metaData,
  } = data;
  const peoplePhoto = findBlock(contentModules, BLOCKS_SLUGS.contactPageCompanyPhoto);

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
        <PageHeader
          breadcrumbs={breadcrumbs}
          breadcrumbsTheme="dark"
        />
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

ContactUsContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
};

export default ContactUsContainer;
