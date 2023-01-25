import React from 'react';
import dynamic from 'next/dynamic';
import { getDocumentFields } from 'utils/helper';
import { HOMEPAGE_SECTION_TYPES } from 'utils/constants';
import CardsSection from 'UI/sections/CardsSection';
import FeedbackSection from 'UI/sections/FeedbackSection';

const Portfolio = dynamic(() => import('UI/sections/Portfolio'), { ssr: false });
const TextSection = dynamic(() => import('UI/sections/TextSection'));
const SvgListSection = dynamic(() => import('UI/sections/SvgListSection'));
const ReviewsSection = dynamic(() => import('UI/sections/ReviewsSection'));
const Blog = dynamic(() => import('UI/sections/Blog'));
const PhotoGallery = dynamic(() => import('components/Common/PhotoGallery'));

const SectionSelector = ({ section, type }) => {
  const { type: sectionType } = getDocumentFields(section);

  switch (sectionType) {
  case HOMEPAGE_SECTION_TYPES.text:
    return (
      <TextSection
        sectionData={section}
        type={type}
      />
    );

  case HOMEPAGE_SECTION_TYPES.cards:
    return (
      <CardsSection
        section={section}
        type={type}
        sectionType="cards"
      />
    );

  case HOMEPAGE_SECTION_TYPES.cardsWithOverlay:
    return (
      <CardsSection
        section={section}
        type={type}
        withOverlay
      />
    );

  case HOMEPAGE_SECTION_TYPES.porfolio:
    return (
      <Portfolio sectionData={section} />
    );

  case HOMEPAGE_SECTION_TYPES.svgDisplay:
    return (
      <SvgListSection
        section={section}
        type={type}
      />
    );

  case HOMEPAGE_SECTION_TYPES.svgDisplayWithSelector:
    return (
      <SvgListSection
        section={section}
        type={type}
        withSelector
      />
    );

  case HOMEPAGE_SECTION_TYPES.reviews:
    return (
      <ReviewsSection
        section={section}
        type={type}
      />
    );

  case HOMEPAGE_SECTION_TYPES.blog:
    return <Blog sectionData={section} />;

  case HOMEPAGE_SECTION_TYPES.photos:
    return <PhotoGallery sectionData={section} />;

  case HOMEPAGE_SECTION_TYPES.feedback:
    return (
      <FeedbackSection
        section={section}
        type={type}
      />
    );

  default:
    return null;
  }
};

export default SectionSelector;
