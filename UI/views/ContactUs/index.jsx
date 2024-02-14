import MetaTags from 'components/Common/MetaTags';
import { PAGES } from 'utils/constants';
import FullLayout from 'components/Layout/FullLayout';
import ImageSection from 'UI/sections/ImageSection';
import CompanyPlacementWithMap from 'UI/sections/CompanyPlacementWithMap';
import PageHeader from 'UI/components/PageHeader';
import FeedbackForm from 'UI/components/Forms/FeedbackForm';
import SectionTitle from 'UI/components/SectionTitle';
import LinkWrapper from 'UI/components/LinkWrapper';
import { EMAIL_LINK } from 'utils/constants/contacts';
import Contacts from 'UI/components/Contacts';
import useContactUsProps from './utils/useContactUsProps';
import styles from './ContactUs.module.scss';

const ContactUs = () => {
  const {
    breadcrumbs,
    pageMetadata,
    peoplePhotoSection,
  } = useContactUsProps();

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
        <SectionTitle
          title="Got a project in mind?"
          titleStyle={styles.formTitle}
        >
          <p className={styles.formSubtitle}>
            Fill in this form or
            {' '}
            <LinkWrapper path={`mailto:${EMAIL_LINK}`}>
              send us an e-mail
            </LinkWrapper>
          </p>
        </SectionTitle>

        <section className={styles.formAndContacts}>
          <FeedbackForm
            isBudgetSlider
            className={styles.form}
          >
            <Contacts className={styles.contacts} />
          </FeedbackForm>
        </section>

        <CompanyPlacementWithMap className={styles.addresses} />

        <ImageSection
          section={peoplePhotoSection}
          type="contact"
        />
      </FullLayout>
    </>
  );
};

export default ContactUs;
