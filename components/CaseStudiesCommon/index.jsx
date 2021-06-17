import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import get from 'lodash/get';
import AppFeatures from 'components/CaseStudiesCommon/AppFeatures';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import ChallengesAndSolutions from 'components/CaseStudiesCommon/ChallengesAndSolutions';
import ChallengesAndSolutionsWithWireframes from 'components/CaseStudiesCommon/ChallengesAndSolutionsWithWireframes';
import SpecialChallengesAndSolutions from 'components/CaseStudiesCommon/SpecialChallengesAndSolutions';
import ProjectIdea from 'components/CaseStudiesCommon/ProjectIdea';
import Wireframes from 'components/CaseStudiesCommon/Wireframes';
import Intro from 'components/CaseStudiesCommon/Intro';
import Images from 'components/CaseStudiesCommon/Images';
import { getFileUrl } from 'utils/helper';
import { CASE_STUDIES_TYPES } from 'utils/constants';
import styles from './styles.module.scss';

const CaseStudiesCommon = ({
  introSection,
  type,
  data,
}) => {
  const sectionTitle = (
    <SectionTitle
      data={data}
      type={type}
    />
  );

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
      <section className={cn(
        styles.challenges, {
          [styles[type]]: data.images,
          [styles.challengesWithoutImage]: data.images,
        },
      )}
      >
        {sectionTitle}
        <ChallengesAndSolutionsWithWireframes
          data={data}
          type={type}
        />
      </section>
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
      <section className={cn(styles[type], styles.wireframes)}>
        {sectionTitle}
        <Wireframes
          data={data}
          type={type}
        />
      </section>
    );
  case CASE_STUDIES_TYPES.appFeatures:
    return (
      <section className={styles[type]}>
        {sectionTitle}
        <AppFeatures data={data} />
      </section>
    );
  case CASE_STUDIES_TYPES.image:
    return (
      <section className={cn(styles[type], styles.imageSection)}>
        {sectionTitle}
        <Images data={data} />
      </section>
    );
  case CASE_STUDIES_TYPES.results:
    return (
      <section className={styles[type]}>
        {sectionTitle}
        <Images data={data} />
      </section>
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
