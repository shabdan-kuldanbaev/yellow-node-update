import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Animated } from 'components/Common/Animated';
import KeyFeatures from 'components/CaseStudiesCommon/ProjectIdea/KeyFeatures';
import AdditionInformation from 'components/CaseStudiesCommon/ProjectIdea/AdditionInformation';
import TeamSection from 'components/CaseStudiesCommon/ProjectIdea/TeamSection';
import { ANIMATED_TYPE } from 'utils/constants';
import { getDocumentFields } from 'utils/helper';
import styles from './styles.module.scss';

const ProjectIdea = ({ type, data }) => {
  const {
    title,
    subtitle,
    description,
    contentModules,
  } = getDocumentFields(get(data, 'contentModules[1]', {}));

  return (
    <Fragment>
      <KeyFeatures
        features={getDocumentFields(get(data, 'contentModules[0]', {}))}
        type={type}
      />
      <div className={styles.descriptionContainer}>
        <Animated
          type={ANIMATED_TYPE.isFade}
          duration={1000}
        >
          <h3 className={styles.sectionName}>
            {subtitle}
          </h3>
          <h2 className={styles.title}>
            {title}
          </h2>
        </Animated>
        <Animated
          type={ANIMATED_TYPE.isFade}
          delay={500}
          duration={1000}
        >
          <p className={styles.description}>
            {description}
          </p>
        </Animated>
        <Animated
          type={ANIMATED_TYPE.isFade}
          delay={500}
          duration={1000}
        >
          <AdditionInformation additionInformation={contentModules} />
        </Animated>
      </div>
      <TeamSection
        type={type}
        data={getDocumentFields(get(data, 'contentModules[2]', {}))}
      />
    </Fragment>
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
