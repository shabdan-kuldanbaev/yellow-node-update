import dynamic from 'next/dynamic';
import { getDocumentFields } from 'utils/helper';
import { HOMEPAGE_SECTION_TYPES } from 'utils/constants';

const Portfolio = dynamic(() => import('UI/sections/Portfolio'));
const TextSection = dynamic(() => import('UI/sections/TextSection'));
const CardsSection = dynamic(() => import('UI/sections/CardsSection'));
const FeedbackSection = dynamic(() => import('UI/sections/FeedbackSection'));
const SvgListSection = dynamic(() => import('UI/sections/SvgListSection'));
const ReviewsSection = dynamic(() => import('UI/sections/ReviewsSection'));
const Blog = dynamic(() => import('UI/sections/Blog'));
const PhotoGallery = dynamic(() => import('components/Common/PhotoGallery'));
const AccordionCardStack = dynamic(() => import('UI/sections/AccordionCardStack'));

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

  case HOMEPAGE_SECTION_TYPES.accordionCardStack:
    return (
      <AccordionCardStack
        data={section}
        type={type}
      />
    );

  default:
    return null;
  }
};

export default SectionSelector;
