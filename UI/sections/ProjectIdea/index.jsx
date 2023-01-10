import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Animated from 'components/Common/Animated';
import KeyFeatures from 'UI/components/KeyFeatures';
import TeamSection from 'UI/components/TeamSection';
import AdditionInformation from 'components/CaseStudiesCommon/ProjectIdea/AdditionInformation';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import { ANIMATION_CASE_STUDY_PROPS } from 'components/CaseStudiesCommon/utils/data';
import { useProjectIdea } from './utils/useProjectIdea';
import styles from './styles.module.scss';

const ProjectIdea = (props) => {
  const {
    isMobileResolution,
    type,
    title,
    subtitle,
    text,
    contentModules,
    delayedAnimation,
    featuresProps,
    teamSectionProps,
  } = useProjectIdea(props);

  return (
    <section className={cn(styles[type], styles.container)}>
      <div className={styles.contentContainer}>
        <KeyFeatures
          features={featuresProps}
          type={type}
        />
        <div className={styles.descriptionContainer}>
          <div className={styles.descriptionIntro}>
            <Animated {...ANIMATION_CASE_STUDY_PROPS}>
              <span className={styles.sectionName}>
                {subtitle}
              </span>
              <h2 className={styles.title}>
                {title}
              </h2>
            </Animated>
            <Animated {...delayedAnimation}>
              <div className={styles.description}>
                <ContentfulParser document={text} />
              </div>
            </Animated>
          </div>
          {!isMobileResolution && (
            <Animated {...delayedAnimation}>
              <AdditionInformation
                additionInformation={contentModules}
                type={type}
              />
            </Animated>
          )}
        </div>
      </div>
      {isMobileResolution && (
        <Animated {...delayedAnimation}>
          <AdditionInformation
            additionInformation={contentModules}
            type={type}
            className={styles.mobileAdditionalInformation}
          />
        </Animated>
      )}
      {teamSectionProps && (
        <TeamSection
          data={teamSectionProps}
          type={type}
        />
      )}
    </section>
  );
};

ProjectIdea.defaultProps = {
  type: '',
  isMobileResolution: false,
};

ProjectIdea.propTypes = {
  type: PropTypes.string,
  data: PropTypes.instanceOf(Object).isRequired,
  isMobileResolution: PropTypes.bool,
};

export default ProjectIdea;
