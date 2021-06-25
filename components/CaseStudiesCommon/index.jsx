import React from 'react';
import AppFeatures from 'components/CaseStudiesCommon/AppFeatures';
import ChallengesAndSolutionsWithWireframes from 'components/CaseStudiesCommon/ChallengesAndSolutionsWithWireframes';
import SpecialChallengesAndSolutions from 'components/CaseStudiesCommon/SpecialChallengesAndSolutions';
import ProjectIdea from 'components/CaseStudiesCommon/ProjectIdea';
import WireframesSection from 'components/CaseStudiesCommon/WireframesSectoin';
import Intro from 'components/CaseStudiesCommon/Intro';
import ResultsSection from 'components/CaseStudiesCommon/ResultsSection';
import ImagesSection from 'components/CaseStudiesCommon/ImagesSection';
import DesignSection from 'components/CaseStudiesCommon/DesignSection';
import { CASE_STUDIES_TYPES } from 'utils/constants';

const CaseStudiesCommon = (props) => {
  switch (props.data.type) {
  case CASE_STUDIES_TYPES.intro:
    return <Intro {...props} />;
  case CASE_STUDIES_TYPES.projectIdea:
    return <ProjectIdea {...props} />;
  case CASE_STUDIES_TYPES.challenges:
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
  case CASE_STUDIES_TYPES.design:
    return <DesignSection {...props} />;
  default:
    return null;
  }
};

export default CaseStudiesCommon;
