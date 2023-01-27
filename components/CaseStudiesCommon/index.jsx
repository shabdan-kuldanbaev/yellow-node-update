import React from 'react';
import dynamic from 'next/dynamic';
import AppFeatures from 'components/CaseStudiesCommon/AppFeatures';
import ChallengesAndSolutionsWithWireframes from 'components/CaseStudiesCommon/ChallengesAndSolutionsWithWireframes';
import SpecialChallengesAndSolutions from 'components/CaseStudiesCommon/SpecialChallengesAndSolutions';
import ProjectIdea from 'components/CaseStudiesCommon/ProjectIdea';
import WireframesSection from 'components/CaseStudiesCommon/WireframesSectoin';
import { Intro } from 'components/CaseStudiesCommon/Intro';
import ResultsSection from 'components/CaseStudiesCommon/ResultsSection';
import ImagesSection from 'components/CaseStudiesCommon/ImagesSection';
import FullScreenImages from 'components/CaseStudiesCommon/FullScreenImages';
import Parallax from 'components/CaseStudiesCommon/Parallax';
import DesignSection from 'components/CaseStudiesCommon/DesignSection';
import WorksSection from 'components/CaseStudiesCommon/WorksSection';
import { FeaturesSection } from 'components/CaseStudiesCommon/FeaturesSection';
import { StorySection } from 'components/CaseStudiesCommon/StorySection';
import { EventSection } from 'components/CaseStudiesCommon/EventSection';
import CaseStudyOverlayProcess from 'components/CaseStudiesCommon/CaseStudyOverlayProcess';
import CaseStudyPrototype from 'components/CaseStudiesCommon/CaseStudyPrototype';
import { CASE_STUDIES_TYPES, REFACTORED_CASE_STUDIES_PAGES } from 'utils/constants';
// Refactored section, remove old after
import IntroRefactored from 'UI/sections/CaseStudiesIntro';
import CaseFeedback from 'UI/sections/CaseFeedback';

const ProjectIdeaRefactored = dynamic(() => import('UI/sections/ProjectIdea'));
const ResultsSectionRefactored = dynamic(() => import('UI/sections/ResultsSection'));
const ImagesSectionRefactored = dynamic(() => import('UI/sections/ImagesSection'));
const WireframesSectionRefactored = dynamic(() => import('UI/sections/WireframesSection'));
const SpecialChallengesAndSolutionsRefactored = dynamic(() => import('UI/sections/SpecialChallengesAndSolutions'));
const ChallengesAndSolutionsWithWireframesRefactored = dynamic(() => import('UI/sections/ChallengesAndSolutionsWithWireframes'));

const CaseStudiesCommon = (props) => {
  if (REFACTORED_CASE_STUDIES_PAGES.includes(props.type)) {
    switch (props.data.type) {
    case CASE_STUDIES_TYPES.intro:
      return <IntroRefactored {...props} />;
    case CASE_STUDIES_TYPES.projectIdea:
      return <ProjectIdeaRefactored {...props} />;
    case CASE_STUDIES_TYPES.results:
      return <ResultsSectionRefactored {...props} />;
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
    case CASE_STUDIES_TYPES.feedback:
      return <CaseFeedback {...props} />;
    default:
      return null;
    }
  } else {
    switch (props.data.type) {
    case CASE_STUDIES_TYPES.intro:
      return <Intro {...props} />;
    case CASE_STUDIES_TYPES.projectIdea:
      return <ProjectIdea {...props} />;
    case CASE_STUDIES_TYPES.challenges:
    case CASE_STUDIES_TYPES.challengesSlider:
    case CASE_STUDIES_TYPES.challengesSpecialSlider:
      return <ChallengesAndSolutionsWithWireframes {...props} />;
    case CASE_STUDIES_TYPES.specialChallenges:
      return <SpecialChallengesAndSolutions {...props} />;
    case CASE_STUDIES_TYPES.wireframe:
      return <WireframesSection {...props} />;
    case CASE_STUDIES_TYPES.appFeatures:
      return <AppFeatures {...props} />;
    case CASE_STUDIES_TYPES.image:
      return <ImagesSection {...props} />;
    case CASE_STUDIES_TYPES.results:
      return <ResultsSection {...props} />;
    case CASE_STUDIES_TYPES.parallax:
      return <Parallax {...props} />;
    case CASE_STUDIES_TYPES.design:
      return <DesignSection {...props} />;
    case CASE_STUDIES_TYPES.features:
      return <FeaturesSection {...props} />;
    case CASE_STUDIES_TYPES.story:
      return <StorySection {...props} />;
    case CASE_STUDIES_TYPES.caseStudyEvent:
      return <EventSection {...props} />;
    case CASE_STUDIES_TYPES.fullscreenImage:
      return <FullScreenImages {...props} />;
    case CASE_STUDIES_TYPES.works:
      return <WorksSection {...props} />;
    case CASE_STUDIES_TYPES.processOverlay:
      return <CaseStudyOverlayProcess {...props} />;
    case CASE_STUDIES_TYPES.prototype:
      return <CaseStudyPrototype {...props} />;
    default:
      return null;
    }
  }
};

export default CaseStudiesCommon;
