import React from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import { SECTION_TYPES } from 'utils/constants';
import { getDocumentFields } from 'utils/helper';

const Intro = dynamic(() => import('UI/sections/CaseStudiesIntro'));
const PhotoGallery = dynamic(() => import('components/Common/PhotoGallery'));
const CaseProcess = dynamic(() => import('UI/sections/CaseProcess'));
const TabsSection = dynamic(() => import('UI/sections/TabsSection'));
const ReviewsSection = dynamic(() => import('UI/sections/ReviewsSection'));
const CaseParallax = dynamic(() => import('UI/sections/CaseParallax'));
const CardsSection = dynamic(() => import('UI/sections/CardsSection'));
const Images = dynamic(() => import('UI/sections/ImagesSection'));
const ProcessSection = dynamic(() => import('UI/sections/ProcessSection'));
const SvgListSection = dynamic(() => import('UI/sections/SvgListSection'));

const SectionSelector = (props) => {
  const {
    introSection,
    data,
    type,
  } = props;

  const { type: sectionType } = getDocumentFields(data, ['type']);

  switch (sectionType) {
  case SECTION_TYPES.intro:
    return (
      <Intro
        introSection={introSection}
        type={type}
        data={data?.fields}
      />
    );
  case SECTION_TYPES.caseProcess:
    return (
      <CaseProcess
        data={data?.fields}
        type={type}
      />
    );
  case SECTION_TYPES.tabs:
    return (
      <TabsSection
        section={data}
        type={type}
      />
    );
  case SECTION_TYPES.review:
    return (
      <ReviewsSection
        section={data}
        type={type}
      />
    );
  case SECTION_TYPES.parallax:
    return (
      <CaseParallax
        data={data?.fields}
        type={type}
      />
    );
  case SECTION_TYPES.images:
    return (
      <Images
        data={data?.fields}
        type={type}
      />
    );
  case SECTION_TYPES.photos:
    return (
      <PhotoGallery
        sectionData={data}
        type={type}
      />
    );
  case SECTION_TYPES.appDevelopmentSvgList:
    return <SvgListSection {...props} />;
  case SECTION_TYPES.appDevelopmentProcess:
    return <ProcessSection {...props} />;
  case SECTION_TYPES.appDevelopmentCards:
    return <CardsSection {...props} />;
  default:
    return null;
  }
};

SectionSelector.propTypes = {
  introSection: PropTypes.shape({}),
  data: PropTypes.shape({
    fields: PropTypes.shape({}),
  }),
  type: PropTypes.string,
};

export default SectionSelector;
