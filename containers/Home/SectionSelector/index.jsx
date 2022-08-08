import React from 'react';
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

  default:
    return null;
  }
};

export default SectionSelector;
