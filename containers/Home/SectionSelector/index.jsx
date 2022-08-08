import React from 'react';
import Blog from 'containers/Home/Blog';
import CardsSection from 'components/AppDevelopmentCommon/CardsSection';
import { getDocumentFields } from 'utils/helper';
import { HOMEPAGE_SECTION_TYPES } from 'utils/constants';

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

  case HOMEPAGE_SECTION_TYPES.blog:
    return <Blog sectionData={section} />;

  default:
    return null;
  }
};

export default SectionSelector;
