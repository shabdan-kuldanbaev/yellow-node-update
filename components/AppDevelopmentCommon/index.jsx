import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import TabsSection from 'UI/sections/TabsSection';
import DownloadSection from 'UI/sections/DownloadSection';
import PageIntroSection from 'UI/sections/PageIntroSection';
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
const SvgListSection = dynamic(() => import('UI/sections/SvgListSection'), { ssr: false });
const BookmarkCardSection = dynamic(() => import('components/AppDevelopmentCommon/BookmarkCardSection'));
const AppOverlayProcess = dynamic(() => import('components/AppDevelopmentCommon/AppOverlayProcess'));
const AppDevelopmentSliderCards = dynamic(() => import('components/AppDevelopmentCommon/AppDevelopmentSliderCards'));

export const AppDevelopmentCommon = ({ introSection, ...props }) => {
  const {
    type,
    section,
    handleOnCTAClick,
  } = props;

  if (!section.fields) {
    return null;
  }

  const { type: sectionType } = getDocumentFields(section);

  switch (sectionType) {
  case APP_DEVELOPMENT_TYPES.appDevelopmentPageIntro:
    return (
      <PageIntroSection
        introSection={introSection}
        {...props}
      />
    );
  case APP_DEVELOPMENT_TYPES.processOverlay:
    return (
      <AppOverlayProcess {...props} />
    );
  case APP_DEVELOPMENT_TYPES.appDevelopmentImageSection:
    return (
      <ImageSection {...props} />
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
      <SvgListSection {...props} />
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
      <FaqSection {...props} />
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
      <ImagesListSection {...props} />
    );
  case APP_DEVELOPMENT_TYPES.appDevelopmentProcess:
    return (
      <ProcessSection {...props} />
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
        withSelector
        {...props}
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
      <AppFeatures {...props} />
    );
  case APP_DEVELOPMENT_TYPES.appDevelopmentAppFeaturesPromo:
    return (
      <AppFeatures
        isPromoImage
        {...props}
      />
    );
  case APP_DEVELOPMENT_TYPES.appDevelopmentPlainTextSection:
    return (
      <PlainTextSection {...props} />
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
      <TabsSection {...props} />
    );
  case APP_DEVELOPMENT_TYPES.appDevelopmentDownloadSection:
    return (
      <DownloadSection {...props} />
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
