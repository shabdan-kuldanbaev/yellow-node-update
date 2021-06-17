import React from 'react';
import PropTypes from 'prop-types';
import AppFeatures from 'components/CaseStudiesCommon/AppFeatures';
import ChallengesAndSolutionsWithWireframes from 'components/CaseStudiesCommon/ChallengesAndSolutionsWithWireframes';
import SpecialChallengesAndSolutions from 'components/CaseStudiesCommon/SpecialChallengesAndSolutions';
import ProjectIdea from 'components/CaseStudiesCommon/ProjectIdea';
import WireframesSection from 'components/CaseStudiesCommon/WireframesSectoin';
import Intro from 'components/CaseStudiesCommon/Intro';
import ResultsSection from 'components/CaseStudiesCommon/ResultsSection';
import ImagesSection from 'components/CaseStudiesCommon/ImagesSection';
import { CASE_STUDIES_TYPES } from 'utils/constants';

const CaseStudiesCommon = ({
  introSection,
  type,
  data,
}) => {
  switch (data.type) {
  case CASE_STUDIES_TYPES.intro:
    return (
      <Intro
        introSection={introSection}
        data={data}
        type={type}
      />
    );
  case CASE_STUDIES_TYPES.projectIdea:
    return (
      <ProjectIdea
        data={data}
        type={type}
      />
    );
  case CASE_STUDIES_TYPES.challenges:
    return (
      <ChallengesAndSolutionsWithWireframes
        data={data}
        type={type}
      />
    );
  case CASE_STUDIES_TYPES.specialChallenges:
    return (
      <SpecialChallengesAndSolutions
        data={data}
        type={type}
      />
    );
  case CASE_STUDIES_TYPES.wireframe:
    return (
      <WireframesSection
        data={data}
        type={type}
      />
    );
  case CASE_STUDIES_TYPES.appFeatures:
    return (
      <AppFeatures
        data={data}
        type={type}
      />
    );
  case CASE_STUDIES_TYPES.image:
    return (
      <ImagesSection
        data={data}
        type={type}
      />
    );
  case CASE_STUDIES_TYPES.results:
    return (
      <ResultsSection
        data={data}
        type={type}
      />
    );
  default:
    return null;
  }
};

CaseStudiesCommon.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default CaseStudiesCommon;
