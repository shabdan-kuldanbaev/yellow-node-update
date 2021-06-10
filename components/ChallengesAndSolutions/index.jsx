import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.module.scss';

const ChallengesAndSolutions = ({
  challenges,
  isChallenges,
  type,
}) => (
  <Fragment>
    {challenges.map((challenge) => (
      <div
        key={challenge.problem}
        className={cn(styles.contentContainer, styles[type])}
      >
        {!challenge.image && (
          <div className={styles.infoContainer}>
            <h3 className={styles.title}>
              {challenge.problemTitle}
            </h3>
          </div>
        )}
        <div className={cn(styles.infoContainer, { [styles.cenrefy]: challenge.image })}>
          {challenge.image && (
            <h3 className={styles.title}>
              {challenge.problemTitle}
            </h3>
          )}
          {isChallenges && (
            <p className={styles.subtitle}>
              Problem:
            </p>
          )}
          <p className={styles.description}>
            {challenge.problem}
          </p>
          {isChallenges && (
            <p className={styles.subtitle}>
              Solution:
            </p>
          )}
          <p className={styles.description}>
            {challenge.solution}
          </p>
        </div>
        {challenge.image && (
          <div>
            <img
              className={styles.image}
              src={challenge.image}
              alt=""
            />
          </div>
        )}
      </div>
    ))}
  </Fragment>
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
