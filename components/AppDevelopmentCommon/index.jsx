import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { PageIntro } from 'components/AppDevelopmentCommon/PageIntro';
import SvgListSection from 'components/AppDevelopmentCommon/SvgListSection';
import { getDocumentFields } from 'utils/helper';
import { APP_DEVELOPMENT_TYPES } from 'utils/constants';

const SliderSection = dynamic(() => import('components/AppDevelopmentCommon/SliderSection'));
const CheckListSection = dynamic(() => import('components/AppDevelopmentCommon/CheckListSection'));
const GallerySection = dynamic(() => import('components/AppDevelopmentCommon/GallerySection'));
const ImageSection = dynamic(() => import('components/AppDevelopmentCommon/ImageSection'));
const CardsSection = dynamic(() => import('components/AppDevelopmentCommon/CardsSection'));
const FaqSection = dynamic(() => import('components/AppDevelopmentCommon/FaqSection'));
const ReviewsSection = dynamic(() => import('components/AppDevelopmentCommon/ReviewsSection'));
const ImagesListSection = dynamic(() => import('components/AppDevelopmentCommon/ImagesListSection'));
const ProcessSection = dynamic(() => import('components/AppDevelopmentCommon/ProcessSection'));

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
