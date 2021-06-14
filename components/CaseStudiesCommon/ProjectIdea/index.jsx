import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'components/Common/Animated';
import KeyFeatures from 'components/CaseStudiesCommon/ProjectIdea/KeyFeatures';
import AdditionInformation from 'components/CaseStudiesCommon/ProjectIdea/AdditionInformation';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

const ProjectIdea = ({
  type,
  description,
  features,
  additionInformation,
}) => (
  <Fragment>
    <KeyFeatures
      features={features}
      type={type}
    />
    <div className={styles.descriptionContainer}>
      <Animated
        type={ANIMATED_TYPE.isFade}
        duration={1000}
      >
        <p className={styles.sectionName}>
          About
        </p>
        <h2 className={styles.title}>
          Project Idea
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
        <AdditionInformation additionInformation={additionInformation} />
      </Animated>
    </div>
  </Fragment>
);

ProjectIdea.defaultProps = {
  type: '',
  additionInformation: null,
};

ProjectIdea.propTypes = {
  type: PropTypes.string,
  description: PropTypes.string.isRequired,
  features: PropTypes.instanceOf(Array).isRequired,
  additionInformation: PropTypes.instanceOf(Array),
};

export default ProjectIdea;
