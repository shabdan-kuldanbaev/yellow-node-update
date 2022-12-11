import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { CheckListSection } from 'UI/sections/CheckListSection';
import { NumberedListSection } from 'UI/sections/NumberedListSection';
import TabsSection from 'UI/sections/TabsSection';
import DownloadSection from 'UI/sections/DownloadSection';
import PageIntroSection from 'UI/sections/PageIntroSection';
import PlainTextSection from 'UI/sections/PlainTextSection';
import ProcessSection from 'UI/sections/ProcessSection';
import CardsSection from 'UI/sections/CardsSection';
import { getDocumentFields } from 'utils/helper';
import { APP_DEVELOPMENT_TYPES } from 'utils/constants';

const SliderSection = dynamic(() => import('UI/sections/SliderSection'));
const GallerySection = dynamic(() => import('UI/sections/GallerySection'));
const ImageSection = dynamic(() => import('UI/sections/ImageSection'));
const FaqSection = dynamic(() => import('UI/sections/FaqSection'));
const ReviewsSection = dynamic(() => import('UI/sections/ReviewsSection'));
const ImagesListSection = dynamic(() => import('UI/sections/ImagesListSection'));
const BlogSection = dynamic(() => import('components/AppDevelopmentCommon/BlogSection'));
const CheckSocialSection = dynamic(() => import('components/AppDevelopmentCommon/CheckSocialSection'));
const AppFeatures = dynamic(() => import('UI/sections/AppFeatures'));
const SvgListSection = dynamic(() => import('UI/sections/SvgListSection'), { ssr: false });
const BookmarkCardSection = dynamic(() => import('UI/sections/BookmarkCardSection'));
const AppOverlayProcess = dynamic(() => import('components/AppDevelopmentCommon/AppOverlayProcess'));

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
    return <AppOverlayProcess {...props} />;

  case APP_DEVELOPMENT_TYPES.appDevelopmentImageSection:
    return (
      <ImageSection {...props} />
    );

  case APP_DEVELOPMENT_TYPES.appDevelopmentCards:
    return <CardsSection {...props} />;
  case APP_DEVELOPMENT_TYPES.appDevelopmentSliderCards:
    return (
      <CardsSection
        {...props}
        withSlider
      />
    );

  case APP_DEVELOPMENT_TYPES.appDevelopmentRelatedServices:
    return (
      <CardsSection
        {...props}
        withSlider
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
      <NumberedListSection
        sectionData={section}
        type={type}
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
    return <FaqSection {...props} />;

  case APP_DEVELOPMENT_TYPES.appDevelopmentReviews:
    return <ReviewsSection {...props} />;

  case APP_DEVELOPMENT_TYPES.appDevelopmentImagesList:
    return <ImagesListSection {...props} />;

  case APP_DEVELOPMENT_TYPES.appDevelopmentProcess:
    return <ProcessSection {...props} />;

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
        section={section}
        type={type}
        withOverlay
      />
    );

  case APP_DEVELOPMENT_TYPES.appDevelopmentAppFeatures:
    return <AppFeatures {...props} />;

  case APP_DEVELOPMENT_TYPES.appDevelopmentAppFeaturesPromo:
    return (
      <AppFeatures
        isPromoImage
        {...props}
      />
    );

  case APP_DEVELOPMENT_TYPES.appDevelopmentPlainTextSection:
    return <PlainTextSection {...props} />;

  case APP_DEVELOPMENT_TYPES.appDevelopmentBookmarkCard:
    return (
      <BookmarkCardSection
        sectionData={section}
        pageType={type}
      />
    );
  case APP_DEVELOPMENT_TYPES.appDevelopmentTabsSection:
    return <TabsSection {...props} />;

  case APP_DEVELOPMENT_TYPES.appDevelopmentDownloadSection:
    return <DownloadSection {...props} />;

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
