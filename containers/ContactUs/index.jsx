import React, {
  Fragment,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendEmail } from 'redux/actions/contact';
import { pageReadyToDisplay } from 'redux/actions/layout';
import {
  selectContacts,
  selectCompanyPhoto,
  selectIsLoading,
} from 'redux/selectors/layout';
import {
  FeedbackFormWithTitle,
  Calendar,
  CompanyPeoplePhoto,
  CompanyContacts,
  MetaTags,
  LoadingPage,
} from 'components';
import { PAGES } from 'utils/constants';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import styles from './styles.module.scss';

const ContactUsContainer = ({
  introSection,
  sendEmail,
  officePhoto,
  peoplePhoto,
  pageReadyToDisplay: fetchPage,
  isPageLoading,
}) => {
  const [isAnimationEnded, setIsAnimationEnded] = useState(false);
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
  const handleOnAnimationComplete = () => setIsAnimationEnded(true);

  useEffect(() => {
    fetchPage({ slug: PAGES.contact });
  }, []);

  return (
    <Fragment>
      <MetaTags page={PAGES.contact} />
      { !isAnimationEnded ? (
        <LoadingPage isLoading={isPageLoading} handleOnAnimationComplete={handleOnAnimationComplete} />
      ) : (
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
  pageReadyToDisplay: PropTypes.func.isRequired,
  isPageLoading: PropTypes.bool.isRequired,
};

export default connect((state) => ({
  officePhoto: selectContacts(state),
  peoplePhoto: selectCompanyPhoto(state),
  isPageLoading: selectIsLoading(state),
}), {
  sendEmail,
  pageReadyToDisplay,
})(ContactUsContainer);
