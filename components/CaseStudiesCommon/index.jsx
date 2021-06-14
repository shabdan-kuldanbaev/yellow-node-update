import React from 'react';
import cn from 'classnames';
import AppFeatures from 'components/CaseStudiesCommon/AppFeatures';
import ChallengesAndSolutions from 'components/CaseStudiesCommon/ChallengesAndSolutions';
import ProjectIdea from 'components/CaseStudiesCommon/ProjectIdea';
import TeamSection from 'components/CaseStudiesCommon/TeamSection';
import Wireframe from 'components/CaseStudiesCommon/Wireframe';
import Intro from 'components/CaseStudiesCommon/Intro';
import { CASE_STUDIES_TYPES } from 'utils/constants';
import styles from './styles.module.scss';

const CaseStudiesCommon = ({
  introSection,
  component,
  type,
  data,
  children,
}) => {
  switch (component) {
  case CASE_STUDIES_TYPES.projectIdea:
    return (
      <section className={cn(styles.container, styles[type], styles.idea)}>
        <ProjectIdea
          type={type}
          {...data}
        />
      </section>
    );
  case CASE_STUDIES_TYPES.intro:
    return (
      <Intro
        introSection={introSection}
        type={type}
        {...data}
      />
    );
  case CASE_STUDIES_TYPES.team:
    return (
      <section className={cn(styles.container, styles[type], styles.team)}>
        <TeamSection {...data} />
      </section>
    );
  case CASE_STUDIES_TYPES.challenges:
    return (
      <section className={cn(styles.container, styles.challenges)}>
        {children}
        <ChallengesAndSolutions {...data} />
      </section>
    );
  case CASE_STUDIES_TYPES.challengesWithWireframe:
    return (
      <section className={cn(styles.container, styles[type], styles.challengesWithoutImage)}>
        {children}
        <ChallengesAndSolutions {...data} />
        <Wireframe
          type={type}
          imageUrl={data.wireframe}
        />
      </section>
    );
  case CASE_STUDIES_TYPES.specialChallenges:
    return (
      <section className={cn(styles.container, styles[type], styles.special)}>
        <ChallengesAndSolutions
          type={type}
          {...data}
        />
      </section>
    );
  case CASE_STUDIES_TYPES.wireframe:
    return (
      <section className={cn(styles.container, styles[type], styles.wireframes)}>
        {children}
        {data && data.map((imageUrl) => (
          <Wireframe
            key={imageUrl}
            type={type}
            imageUrl={imageUrl}
          />
        ))}
      </section>
    );
  case CASE_STUDIES_TYPES.appFeatures:
    return (
      <section className={cn(styles.container, styles[type])}>
        {children}
        <AppFeatures {...data} />
      </section>
    );
  case CASE_STUDIES_TYPES.image:
    return (
      <section className={cn(styles.container, styles[type], styles.technology)}>
        {children}
        <div className={styles.imagContainer}>
          <img
            src={data}
            className={styles.image}
            alt=""
          />
        </div>
      </section>
    );
  case CASE_STUDIES_TYPES.results:
    return (
      <section className={cn(styles.container, styles[type])}>
        {children}
        <div className={styles.imagContainer}>
          <img
            src={data}
            className={styles.image}
            alt=""
          />
        </div>
      </section>
    );
  default:
    return null;
  }
};

export default CaseStudiesCommon;
