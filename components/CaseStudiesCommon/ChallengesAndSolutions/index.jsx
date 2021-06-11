import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.module.scss';

const ChallengesAndSolutions = ({
  challenges,
  isChallenges,
  type,
}) => (
  <div>
    {challenges.map(({
      problem,
      problemTitle,
      solution,
      image,
    }) => (
      <div
        key={problem}
        className={cn(styles.contentContainer, styles[type])}
      >
        {!image && (
          <div className={styles.infoContainer}>
            <h3 className={styles.title}>
              {problemTitle}
            </h3>
          </div>
        )}
        <div className={cn(styles.infoContainer, { [styles.centrefy]: image })}>
          {image && (
            <h3 className={styles.title}>
              {problemTitle}
            </h3>
          )}
          {isChallenges && (
            <p className={styles.subtitle}>
              Problem:
            </p>
          )}
          <p className={styles.description}>
            {problem}
          </p>
          {isChallenges && (
            <p className={styles.subtitle}>
              Solution:
            </p>
          )}
          <p className={styles.description}>
            {solution}
          </p>
        </div>
        {image && (
          <div>
            <img
              className={styles.image}
              src={image}
              alt=""
            />
          </div>
        )}
      </div>
    ))}
  </div>
);

ChallengesAndSolutions.defaultProps = {
  isChallenges: false,
  type: '',
};

ChallengesAndSolutions.propTypes = {
  challenges: PropTypes.instanceOf(Array).isRequired,
  isChallenges: PropTypes.bool,
  type: PropTypes.string,
};

export default ChallengesAndSolutions;
