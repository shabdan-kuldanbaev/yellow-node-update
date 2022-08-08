import React from 'react';
import dynamic from 'next/dynamic';
import { getDocumentFields } from 'utils/helper';
import { HOMEPAGE_SECTION_TYPES } from 'utils/constants';

const CardsSection = dynamic(() => import('components/AppDevelopmentCommon/CardsSection'));
const ReviewsSection = dynamic(() => import('components/AppDevelopmentCommon/ReviewsSection'), { ssr: false });
const Blog = dynamic(() => import('containers/Home/Blog'));

const SectionSelector = ({ section, type }) => {
  const { type: sectionType } = getDocumentFields(section);

  switch (sectionType) {
  case HOMEPAGE_SECTION_TYPES.cards:
    return (
      <CardsSection
        sectionData={section}
        pageType={type}
        sectionType="cards"
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

  default:
    return null;
  }
};

export default SectionSelector;
