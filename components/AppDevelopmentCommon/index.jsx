import React from 'react';
import PropTypes from 'prop-types';
import { PageIntro } from 'components/AppDevelopmentCommon/PageIntro';
import { ImageSection } from 'components/AppDevelopmentCommon/ImageSection';
import { CardsSection } from 'components/AppDevelopmentCommon/CardsSection';
import ProcessSection from 'components/AppDevelopmentCommon/ProcessSection';
import { CheckListSection } from 'components/AppDevelopmentCommon/CheckListSection';
import { SliderSection } from 'components/AppDevelopmentCommon/SliderSection';
import SvgListSection from 'components/AppDevelopmentCommon/SvgListSection';
import GallerySection from 'components/AppDevelopmentCommon/GallerySection';
import { FaqSection } from 'components/AppDevelopmentCommon/FaqSection';
import { ReviewsSection } from 'components/AppDevelopmentCommon/ReviewsSection';
import { ImagesListSection } from 'components/AppDevelopmentCommon/ImagesListSection';
import { CheckSocialSection } from 'components/AppDevelopmentCommon/CheckSocialSection';
import { getDocumentFields } from 'utils/helper';
import { APP_DEVELOPMENT_TYPES } from 'utils/constants';

export const AppDevelopmentCommon = ({
  type,
  section,
  handleOnCTAClick,
  introSection,
}) => {
  if (!section.fields) {
    return null;
  }

  const { type: sectionType } = getDocumentFields(section);

  switch (sectionType) {
  case APP_DEVELOPMENT_TYPES.appDevelopmentPageIntro:
    return (
      <PageIntro
        sectionData={section}
        type={type}
        introSection={introSection}
      />
    );
  case APP_DEVELOPMENT_TYPES.appDevelopmentImageSection:
    return (
      <ImageSection
        sectionData={section}
        type={type}
      />
    );
  case APP_DEVELOPMENT_TYPES.appDevelopmentCards:
    return (
      <CardsSection
        sectionData={section}
        pageType={type}
        sectionType="cards"
        handleOnCTAClick={handleOnCTAClick}
      />
    );
  case APP_DEVELOPMENT_TYPES.appDevelopmentSmallCards:
    return (
      <CardsSection
        sectionData={section}
        pageType={type}
        sectionType="smallCards"
        handleOnCTAClick={handleOnCTAClick}
      />
    );
  case APP_DEVELOPMENT_TYPES.appDevelopmentCheckList:
    return (
      <CheckListSection
        sectionData={section}
        type={type}
        handleOnCTAClick={handleOnCTAClick}
      />
    );
  case APP_DEVELOPMENT_TYPES.appDevelopmentNumberedList:
    return (
      <CheckListSection
        sectionData={section}
        type={type}
        isNumberedList
        handleOnCTAClick={handleOnCTAClick}
      />
    );
  case APP_DEVELOPMENT_TYPES.appDevelopmentSvgList:
    return (
      <SvgListSection
        sectionData={section}
        handleOnCTAClick={handleOnCTAClick}
        type={type}
      />
    );
  case APP_DEVELOPMENT_TYPES.appDevelopmentSlider:
    return (
      <SliderSection
        sectionData={section}
        type={type}
      />
    );
  case APP_DEVELOPMENT_TYPES.appDevelopmentGallery:
    return (
      <GallerySection
        sectionData={section}
        type={type}
        handleOnCTAClick={handleOnCTAClick}
      />
    );
  case APP_DEVELOPMENT_TYPES.appDevelopmentFAQ:
    return (
      <FaqSection
        data={section}
        type={type}
      />
    );
  case APP_DEVELOPMENT_TYPES.appDevelopmentReviews:
    return (
      <ReviewsSection
        data={section}
        type={type}
      />
    );
  case APP_DEVELOPMENT_TYPES.appDevelopmentImagesList:
    return (
      <ImagesListSection
        sectionData={section}
        type={type}
      />
    );
  case APP_DEVELOPMENT_TYPES.appDevelopmentProcess:
    return (
      <ProcessSection
        sectionData={section}
        pageType={type}
      />
    );
  case APP_DEVELOPMENT_TYPES.appDevelopmentCheckSocial:
    return (
      <CheckSocialSection
        sectionData={section}
        type={type}
      />
    );
  default:
    return null;
  }
};

AppDevelopmentCommon.defaultProps = {
  handleOnCTAClick: () => {},
  introSection: null,
};

AppDevelopmentCommon.propTypes = {
  section: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
  handleOnCTAClick: PropTypes.func,
  introSection: PropTypes.instanceOf(Object),
};
