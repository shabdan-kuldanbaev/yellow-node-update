import React from 'react';
import dynamic from 'next/dynamic';
import { getDocumentFields } from 'utils/helper';
import { HOMEPAGE_SECTION_TYPES } from 'utils/constants';

const Portfolio = dynamic(() => import('containers/Home/Portfolio'), { ssr: false });
const TextSection = dynamic(() => import('components/TextSection'));
const CardsSection = dynamic(() => import('components/AppDevelopmentCommon/CardsSection'));
const SvgListSection = dynamic(() => import('components/AppDevelopmentCommon/SvgListSection'));
const ReviewsSection = dynamic(() => import('components/AppDevelopmentCommon/ReviewsSection'), { ssr: false });
const Blog = dynamic(() => import('containers/Home/Blog'));
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
        sectionData={section}
        pageType={type}
        sectionType="cards"
      />
    );

  case HOMEPAGE_SECTION_TYPES.porfolio:
    return (
      <Portfolio sectionData={section} />
    );

  case HOMEPAGE_SECTION_TYPES.svgDisplay:
    return (
      <SvgListSection
        sectionData={section}
        type={type}
      />
    );

  case HOMEPAGE_SECTION_TYPES.svgDisplayWithSelector:
    return (
      <SvgListSection
        sectionData={section}
        type={type}
        withSelector
      />
    );

  case HOMEPAGE_SECTION_TYPES.reviews:
    return (
      <ReviewsSection
        data={section}
        type={type}
      />
    );

  case HOMEPAGE_SECTION_TYPES.blog:
    return <Blog sectionData={section} />;

  case HOMEPAGE_SECTION_TYPES.photos:
    return <PhotoGallery sectionData={section} />;

  default:
    return null;
  }
};

export default SectionSelector;
