import dynamic from 'next/dynamic';
import { CASE_STUDIES_TYPES } from 'utils/constants';

const IntroRefactored = dynamic(() => import('UI/sections/CaseStudiesIntro'));
const ProjectIdeaRefactored = dynamic(() => import('UI/sections/ProjectIdea'));
const ResultsSectionRefactored = dynamic(() => import('UI/sections/ResultsSection'));
const ImagesSectionRefactored = dynamic(() => import('UI/sections/ImagesSection'));
const WireframesSectionRefactored = dynamic(() => import('UI/sections/WireframesSection'));
const SpecialChallengesAndSolutionsRefactored = dynamic(() => import('UI/sections/SpecialChallengesAndSolutions'));
const ChallengesAndSolutionsWithWireframesRefactored = dynamic(() => import('UI/sections/ChallengesAndSolutionsWithWireframes'));
const CaseParallax = dynamic(() => import('UI/sections/CaseParallax'));
const CaseStudyDesign = dynamic(() => import('UI/sections/CaseStudyDesign'));
const CaseAppFeatures = dynamic(() => import('UI/sections/CaseAppFeatures'));
const CaseFeaturesSection = dynamic(() => import('UI/sections/CaseFeaturesSection'));
const CaseFullScreenImages = dynamic(() => import('UI/sections/CaseFullScreenImages'));
const CaseEvent = dynamic(() => import('UI/sections/CaseEvent'));
const CaseStudiesStory = dynamic(() => import('UI/sections/CaseStudiesStory'));
const CaseProcess = dynamic(() => import('UI/sections/CaseProcess'));
const CasePrototype = dynamic(() => import('UI/sections/CasePrototype'));
const CaseFeedback = dynamic(() => import('UI/sections/CaseFeedback'));
const CardsSection = dynamic(() => import('UI/sections/CardsSection'));
const ProcessSection = dynamic(() => import('UI/sections/ProcessSection'));
const TabsSection = dynamic(() => import('UI/sections/TabsSection'));

const CaseStudiesCommon = (props) => {
  switch (props.data.type) {
  case CASE_STUDIES_TYPES.intro:
    return <IntroRefactored {...props} />;
  case CASE_STUDIES_TYPES.projectIdea:
    return <ProjectIdeaRefactored {...props} />;
  case CASE_STUDIES_TYPES.results:
    return <ResultsSectionRefactored {...props} />;
  case CASE_STUDIES_TYPES.appFeatures:
    return <CaseAppFeatures {...props} />;
  case CASE_STUDIES_TYPES.image:
    return <ImagesSectionRefactored {...props} />;
  case CASE_STUDIES_TYPES.wireframe:
    return <WireframesSectionRefactored {...props} />;
  case CASE_STUDIES_TYPES.specialChallenges:
    return <SpecialChallengesAndSolutionsRefactored {...props} />;
  case CASE_STUDIES_TYPES.challenges:
  case CASE_STUDIES_TYPES.challengesSlider:
  case CASE_STUDIES_TYPES.challengesSpecialSlider:
    return <ChallengesAndSolutionsWithWireframesRefactored {...props} />;
  case CASE_STUDIES_TYPES.parallax:
    return <CaseParallax {...props} />;
  case CASE_STUDIES_TYPES.feedback:
    return <CaseFeedback {...props} />;
  case CASE_STUDIES_TYPES.design:
    return <CaseStudyDesign {...props} />;
  case CASE_STUDIES_TYPES.features:
    return <CaseFeaturesSection {...props} />;
  case CASE_STUDIES_TYPES.fullscreenImage:
    return <CaseFullScreenImages {...props} />;
  case CASE_STUDIES_TYPES.caseStudyEvent:
    return <CaseEvent {...props} />;
  case CASE_STUDIES_TYPES.story:
    return <CaseStudiesStory {...props} />;
  case CASE_STUDIES_TYPES.process:
    return <CaseProcess {...props} />;
  case CASE_STUDIES_TYPES.prototype:
    return <CasePrototype {...props} />;
  case CASE_STUDIES_TYPES.cards:
    return <CardsSection {...props} />;
  case CASE_STUDIES_TYPES.tabs:
    return <TabsSection {...props} />;
  case CASE_STUDIES_TYPES.cardsWithOverlay:
    return (
      <CardsSection
        {...props}
        withOverlay
      />
    );
  case CASE_STUDIES_TYPES.processWithArrays:
    return (
      <ProcessSection {...props} />
    );
  default:
    return null;
  }
};

export default CaseStudiesCommon;
