import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { getDocumentFields } from 'utils/helper';
import { WHY_US_TYPE } from 'utils/constants';

const Parallax = dynamic(() => import('UI/sections/CaseParallax'));
const Process = dynamic(() => import('UI/sections/CaseProcess'));
const FeedbackSection = dynamic(() => import('UI/sections/FeedbackSection'));
const SvgListSection = dynamic(() => import('UI/sections/SvgListSection'), { ssr: false });
const ImagesSection = dynamic(() => import('UI/sections/ImagesSection'));
const Challenges = dynamic(() => import('UI/sections/ChallengesAndSolutionsWithWireframes'));
const Tabs = dynamic(() => import('UI/sections/TabsSection'));
const Gallery = dynamic(() => import('UI/sections/GallerySection'));
const Intro = dynamic(() => import('UI/sections/CaseStudiesIntro'));
const Results = dynamic(() => import('UI/sections/ResultsSection'));

export const WhyUsCommon = ({ introSection, ...props }) => {
  const {
    type,
    section,
  } = props;

  if (!section.fields) {
    return null;
  }

  const { type: sectionType } = getDocumentFields(section, ['type']);

  switch (sectionType) {
  case WHY_US_TYPE.intro:
    return (
      <Intro
        introSection={introSection}
        data={section.fields}
        type={type}
      />
    );

  case WHY_US_TYPE.svgList:
    return <SvgListSection {...props} />;

  case WHY_US_TYPE.tabs:
    return <Tabs {...props} />;

  case WHY_US_TYPE.feedback:
    return <FeedbackSection {...props} />;

  case WHY_US_TYPE.gallery:
    return (
      <Gallery
        type={type}
        sectionData={section}
      />
    );

  case WHY_US_TYPE.imagesSection:
    return (
      <ImagesSection
        data={section.fields}
        type={type}
      />
    );

  case WHY_US_TYPE.process:
    return (
      <Process
        type={type}
        data={section.fields}
      />
    );

  case WHY_US_TYPE.parallax:
    return (
      <Parallax
        type={type}
        data={section.fields}
      />
    );

  case WHY_US_TYPE.challenges:
    return (
      <Challenges
        type={type}
        data={section.fields}
      />
    );

  case WHY_US_TYPE.results:
    return (
      <Results
        type={type}
        data={section.fields}
      />
    );
  default:
    return null;
  }
};

WhyUsCommon.propTypes = {
  section: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
  handleOnCTAClick: PropTypes.func,
};
