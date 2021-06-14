import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Animated } from 'components/Common/Animated';
import { ANIMATED_TYPE } from 'utils/constants';
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
          <Animated
            type={ANIMATED_TYPE.isFade}
            delay={500}
            duration={1000}
          >
            <div className={styles.infoContainer}>
              <h3 className={styles.title}>
                {problemTitle}
              </h3>
            </div>
          </Animated>
        )}
        <div className={cn(styles.infoContainer, { [styles.centrefy]: image })}>
          {image && (
            <Animated
              type={ANIMATED_TYPE.isFade}
              delay={1000}
              duration={1000}
            >
              <h3 className={styles.title}>
                {problemTitle}
              </h3>
            </Animated>
          )}
          <Animated
            type={ANIMATED_TYPE.isFade}
            delay={1000}
            duration={1000}
          >
            <Fragment>
              {isChallenges && (
                <p className={styles.subtitle}>
                  Problem:
                </p>
              )}
              <p className={styles.description}>
                {problem}
              </p>
            </Fragment>
          </Animated>
          <Animated
            type={ANIMATED_TYPE.isFade}
            delay={1000}
            duration={1000}
          >
            <Fragment>
              {isChallenges && (
                <p className={styles.subtitle}>
                  Solution:
                </p>
              )}
              <p className={styles.description}>
                {solution}
              </p>
            </Fragment>
          </Animated>
        </div>
        {image && (
          <Animated
            type={ANIMATED_TYPE.isFade}
            duration={1000}
          >
            <div>
              <img
                className={styles.image}
                src={image}
                alt=""
              />
            </div>
          </Animated>
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
