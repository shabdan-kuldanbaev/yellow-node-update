import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Animated } from 'components/Common/Animated';
import KeyFeatures from 'components/CaseStudiesCommon/ProjectIdea/KeyFeatures';
import AdditionInformation from 'components/CaseStudiesCommon/ProjectIdea/AdditionInformation';
import { ContentfulParser } from 'components/BlogCommon/Article/ContentfulParser';
import TeamSection from 'components/CaseStudiesCommon/ProjectIdea/TeamSection';
import { ANIMATION_CASE_STUDY_PROPS } from 'utils/constants';
import { getDocumentFields } from 'utils/helper';
import styles from './styles.module.scss';

const ProjectIdea = ({ type, data }) => {
  const {
    title,
    subtitle,
    text,
    contentModules,
  } = getDocumentFields(get(data, 'contentModules[1]', {}));
  const delayedAnimation = {
    ...ANIMATION_CASE_STUDY_PROPS,
    delay: 500,
  };

  return (
    <section className={styles[type]}>
      <KeyFeatures
        features={getDocumentFields(get(data, 'contentModules[0]'))}
        type={type}
      />
      <div className={styles.descriptionContainer}>
        <Animated {...ANIMATION_CASE_STUDY_PROPS}>
          <h3 className={styles.sectionName}>
            {subtitle}
          </h3>
          <h2 className={styles.title}>
            {title}
          </h2>
        </Animated>
        <Animated {...delayedAnimation}>
          <div className={styles.description}>
            <ContentfulParser document={text} />
          </div>
        </Animated>
        <Animated {...delayedAnimation}>
          <AdditionInformation additionInformation={contentModules} />
        </Animated>
      </div>
      <TeamSection
        data={getDocumentFields(get(data, 'contentModules[2]'))}
        type={type}
      />
    </section>
  );
};

ProjectIdea.defaultProps = {
  type: '',
};

ProjectIdea.propTypes = {
  type: PropTypes.string,
  data: PropTypes.instanceOf(Object).isRequired,
};

export default ProjectIdea;
