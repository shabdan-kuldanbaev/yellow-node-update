import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Animated from 'components/Common/Animated';
import KeyFeatures from 'UI/components/KeyFeatures';
import TeamList from 'UI/components/TeamList';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import { ANIMATION_CASE_STUDY_PROPS } from 'components/CaseStudiesCommon/utils/data';
import Typography from 'UI/components/Typography';
import CaseAdditionalContent from 'UI/components/ CaseAdditionalContent';
import { useProjectIdea } from './utils/useProjectIdea';
import styles from './styles.module.scss';

const ProjectIdea = (props) => {
  const {
    isMobileResolution,
    type,
    title,
    subtitle,
    text,
    additionalContent,
    delayedAnimation,
    featuresProps,
    teamListProps,
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
              <Typography className={styles.sectionName}>
                {subtitle}
              </Typography>
              <Typography
                variant="h2"
                className={styles.title}
              >
                {title}
              </Typography>
            </Animated>
            <Animated {...delayedAnimation}>
              <div className={styles.description}>
                <ContentfulParser document={text} />
              </div>
            </Animated>
          </div>
          {!isMobileResolution && (
            <Animated {...delayedAnimation}>
              <CaseAdditionalContent
                data={additionalContent}
                type={type}
              />
            </Animated>
          )}
        </div>
      </div>
      {isMobileResolution && (
        <Animated {...delayedAnimation}>
          <CaseAdditionalContent
            data={additionalContent}
            type={type}
          />
        </Animated>
      )}
      {teamListProps && (
        <TeamList
          data={teamListProps}
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
