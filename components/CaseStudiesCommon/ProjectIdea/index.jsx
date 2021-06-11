import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import KeyFeatures from 'components/CaseStudiesCommon/ProjectIdea/KeyFeatures';
import AdditionInformation from 'components/CaseStudiesCommon/ProjectIdea/AdditionInformation';
import styles from './styles.module.scss';

const Index = ({
  description,
  features,
  additionInformation,
}) => (
  <Fragment>
    <KeyFeatures features={features} />
    <div className={styles.descriptionContainer}>
      <p className={styles.sectionName}>
        About
      </p>
      <h2 className={styles.title}>
        Project Idea
      </h2>
      <p className={styles.description}>
        {description}
      </p>
      {additionInformation && <AdditionInformation additionInformation={additionInformation} />}
    </div>
  </Fragment>
);

Index.defaultProps = {
  additionInformation: null,
};

Index.propTypes = {
  description: PropTypes.string.isRequired,
  features: PropTypes.instanceOf(Array).isRequired,
  additionInformation: PropTypes.instanceOf(Array),
};

export default Index;
