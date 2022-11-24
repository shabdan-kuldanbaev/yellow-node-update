import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { PageIntro } from 'components/AppDevelopmentCommon/PageIntro';
import TabsSection from 'UI/sections/TabsSection';
import PlainTextSection from 'UI/sections/PlainTextSection';
import ProcessSection from 'UI/sections/ProcessSection';
import { getDocumentFields } from 'utils/helper';
import { APP_DEVELOPMENT_TYPES } from 'utils/constants';

const SliderSection = dynamic(() => import('components/AppDevelopmentCommon/SliderSection'));
const CheckListSection = dynamic(() => import('components/AppDevelopmentCommon/CheckListSection'));
const GallerySection = dynamic(() => import('components/AppDevelopmentCommon/GallerySection'));
const ImageSection = dynamic(() => import('UI/sections/ImageSection'));
const CardsSection = dynamic(() => import('components/AppDevelopmentCommon/CardsSection'));
const FaqSection = dynamic(() => import('UI/sections/FaqSection'));
const ReviewsSection = dynamic(() => import('components/AppDevelopmentCommon/ReviewsSection'), { ssr: false });
const ImagesListSection = dynamic(() => import('UI/sections/ImagesListSection'));
const RelatedServicesSection = dynamic(() => import('components/AppDevelopmentCommon/RelatedServicesSection'));
const BlogSection = dynamic(() => import('components/AppDevelopmentCommon/BlogSection'));
const CheckSocialSection = dynamic(() => import('components/AppDevelopmentCommon/CheckSocialSection'));
const AppFeatures = dynamic(() => import('UI/sections/AppFeatures'));
const SvgListSection = dynamic(() => import('components/AppDevelopmentCommon/SvgListSection'), { ssr: false });
const BookmarkCardSection = dynamic(() => import('components/AppDevelopmentCommon/BookmarkCardSection'));
const AppOverlayProcess = dynamic(() => import('components/AppDevelopmentCommon/AppOverlayProcess'));
const AppDevelopmentSliderCards = dynamic(() => import('components/AppDevelopmentCommon/AppDevelopmentSliderCards'));
const DownloadSection = dynamic(() => import('components/AppDevelopmentCommon/DownloadSection'));

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
  case APP_DEVELOPMENT_TYPES.processOverlay:
    return (
      <AppOverlayProcess
        data={section.fields}
        type={type}
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
  case APP_DEVELOPMENT_TYPES.appDevelopmentRelatedServices:
    return (
      <RelatedServicesSection
        sectionData={section}
        type={type}
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
        handleOnCTAClick={handleOnCTAClick}
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
  case APP_DEVELOPMENT_TYPES.appDevelopmentBlog:
    return (
      <BlogSection
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
  case APP_DEVELOPMENT_TYPES.svgDisplayWithSelector:
    return (
      <SvgListSection
        sectionData={section}
        type={type}
        withSelector
      />
    );
  case APP_DEVELOPMENT_TYPES.cardsWithOverlay:
    return (
      <CardsSection
        sectionData={section}
        pageType={type}
        sectionType="cards"
        withOverlay
      />
    );
  case APP_DEVELOPMENT_TYPES.appDevelopmentAppFeatures:
    return (
      <AppFeatures
        data={section.fields}
        type={type}
      />
    );
  case APP_DEVELOPMENT_TYPES.appDevelopmentAppFeaturesPromo:
    return (
      <AppFeatures
        data={section.fields}
        type={type}
        isPromoImage
      />
    );
  case APP_DEVELOPMENT_TYPES.appDevelopmentPlainTextSection:
    return (
      <PlainTextSection
        sectionData={section}
        type={type}
      />
    );
  case APP_DEVELOPMENT_TYPES.appDevelopmentBookmarkCard:
    return (
      <BookmarkCardSection
        sectionData={section}
        pageType={type}
      />
    );
  case APP_DEVELOPMENT_TYPES.appDevelopmentSliderCards:
    return (
      <AppDevelopmentSliderCards
        sectionData={section}
        pageType={type}
        sectionType="cards"
        handleOnCTAClick={handleOnCTAClick}
      />
    );
  case APP_DEVELOPMENT_TYPES.appDevelopmentTabsSection:
    return (
      <TabsSection
        data={section.fields}
        type={type}
        handleOnCTAClick={handleOnCTAClick}
      />
    );
  case APP_DEVELOPMENT_TYPES.appDevelopmentDownloadSection:
    return (
      <DownloadSection
        type={type}
        data={section}
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
