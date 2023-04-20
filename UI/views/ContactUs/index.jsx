import MetaTags from 'components/Common/MetaTags';
import { PAGES } from 'utils/constants';
import FullLayout from 'components/Layout/FullLayout';
import ImageSection from 'UI/sections/ImageSection';
import CompanyPlacementWithMap from 'UI/sections/CompanyPlacementWithMap';
import PageHeader from 'UI/components/PageHeader';
import useContactUsProps from './utils/useContactUsProps';

const ContactUs = (props) => {
  const {
    breadcrumbs,
    pageMetadata,
    peoplePhotoSection,
  } = useContactUsProps(props);

  return (
    <>
      <MetaTags
        page={PAGES.contact}
        pageMetadata={pageMetadata}
        breadcrumbs={breadcrumbs}
      />
      <FullLayout disableOverflowHiding>
        <PageHeader
          breadcrumbs={breadcrumbs}
          breadcrumbsTheme="dark"
        />
        {/* <div className={styles.pageIntro}>
          <FeedbackFormWithTitle />
          <CompanyContacts />
        </div> */}
        <CompanyPlacementWithMap />
        <ImageSection
          section={peoplePhotoSection}
          type="contact"
        />
      </FullLayout>
    </>
  );
};

export default ContactUs;
