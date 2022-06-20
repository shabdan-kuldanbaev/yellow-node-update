import React from 'react';
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
import { CASE_STUDIES_TYPES } from 'utils/constants';

const CaseStudiesCommon = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  switch (props.data.type) {
  case CASE_STUDIES_TYPES.intro:
    return <Intro {...props} />;
  case CASE_STUDIES_TYPES.projectIdea:
    return <ProjectIdea {...props} />;
  case CASE_STUDIES_TYPES.challenges:
  case CASE_STUDIES_TYPES.challengesSlider:
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
  default:
    return null;
  }
};

export default CaseStudiesCommon;
