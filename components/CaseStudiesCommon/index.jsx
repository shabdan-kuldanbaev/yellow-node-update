import React from 'react';
import AppFeatures from 'components/CaseStudiesCommon/AppFeatures';
import ChallengesAndSolutionsWithWireframes from 'components/CaseStudiesCommon/ChallengesAndSolutionsWithWireframes';
import SpecialChallengesAndSolutions from 'components/CaseStudiesCommon/SpecialChallengesAndSolutions';
import ProjectIdea from 'components/CaseStudiesCommon/ProjectIdea';
import WireframesSection from 'components/CaseStudiesCommon/WireframesSectoin';
import { PageIntro } from 'components/CaseStudiesCommon/PageIntro';
import ResultsSection from 'components/CaseStudiesCommon/ResultsSection';
import ImagesSection from 'components/CaseStudiesCommon/ImagesSection';
import Parallax from 'components/CaseStudiesCommon/Parallax';
import DesignSection from 'components/CaseStudiesCommon/DesignSection';
import { FeaturesSection } from 'components/CaseStudiesCommon/FeaturesSection';
import { CASE_STUDIES_TYPES } from 'utils/constants';

const CaseStudiesCommon = (props) => {
  switch (props.data.type) {
  case CASE_STUDIES_TYPES.intro:
    return <PageIntro {...props} />;
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
  case CASE_STUDIES_TYPES.parallax:
    return <Parallax {...props} />;
  case CASE_STUDIES_TYPES.design:
    return <DesignSection {...props} />;
  case CASE_STUDIES_TYPES.features:
    return <FeaturesSection {...props} />;
  default:
    return null;
  }
};

export default CaseStudiesCommon;
