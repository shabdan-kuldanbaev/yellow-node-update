import React from 'react';
import PropTypes from 'prop-types';
import { PageIntro } from 'components/AppDevelopmentCommon/PageIntro';
import { ImageSection } from 'components/AppDevelopmentCommon/ImageSection';
import { CardsSection } from 'components/AppDevelopmentCommon/CardsSection';
import { CardsListSection } from 'components/AppDevelopmentCommon/CardsListSection';
import { SliderSection } from 'components/AppDevelopmentCommon/SliderSection';
import { SvgListSection } from 'components/AppDevelopmentCommon/SvgListSection';
import { GallerySection } from 'components/AppDevelopmentCommon/GallerySection';
import { getDocumentFields } from 'utils/helper';
import { APP_DEVELOPMENT_TYPES } from 'utils/constants';

export const AppDevelopmentCommon = ({
  type,
  section,
  handleOnCTAClick,
  index,
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
        hasCTAButton
        handleOnCTAClick={handleOnCTAClick}
        index={index}
      />
    );
  case APP_DEVELOPMENT_TYPES.appDevelopmentSmallCards:
    return (
      <CardsSection
        sectionData={section}
        pageType={type}
        sectionType="smallCards"
      />
    );
  case APP_DEVELOPMENT_TYPES.appDevelopmentCheckList:
    return (
      <CardsListSection
        sectionData={section}
        type={type}
      />
    ); // rename
  case APP_DEVELOPMENT_TYPES.appDevelopmentSvgList:
    return (
      <SvgListSection
        sectionData={section}
        handleOnCTAClick={handleOnCTAClick}
        type={type}
        index={index}
      />
    );
  case APP_DEVELOPMENT_TYPES.chatAppPageFeatures:
    return <SliderSection sectionData={section} />;
  case APP_DEVELOPMENT_TYPES.chatAppPageOurWork:
    return <GallerySection sectionData={section} />;
  default:
    return null;
  }
};

AppDevelopmentCommon.propTypes = {
  section: PropTypes.instanceOf(Object).isRequired,
};
