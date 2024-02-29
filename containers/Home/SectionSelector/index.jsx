import Portfolio from 'UI/sections/Portfolio';
import TextSection from 'UI/sections/TextSection';
import CardsSection from 'UI/sections/CardsSection';
import FeedbackSection from 'UI/sections/FeedbackSection';
import SvgListSection from 'UI/sections/SvgListSection';
import ReviewsSection from 'UI/sections/ReviewsSection';
import Blog from 'UI/sections/Blog';
import PhotoGallery from 'components/Common/PhotoGallery';
import { getDocumentFields } from 'utils/helper';
import { HOMEPAGE_SECTION_TYPES } from 'utils/constants';

const SectionSelector = ({
  section,
  type,
  ...rest
}) => {
  const { type: sectionType } = getDocumentFields(section, ['type']);

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
    return (
      <Blog
        sectionData={section}
        {...rest}
      />
    );

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
