import React from 'react';
import PropTypes from 'prop-types';
import Animated from 'components/Common/Animated';
import CallToAction from 'components/Common/CallToAction';
import { ANIMATED_TYPE, REVEAL_ANIMATION_PROPS } from 'utils/constants';
import styles from './styles.module.scss';

const Process = ({ processes, handleOnCTAClick }) => (
  <div className={styles.processContainer}>
    {processes && processes.map(({
      name,
      description,
      json,
    }, index) => (
      <div
        className={styles.process}
        key={`processes/${name}`}
        data-index={index}
      >
        <div className={styles.processItem}>
          <Animated {...REVEAL_ANIMATION_PROPS}>
            <h2 className={styles.title}>
              <span>{`${index + 1}.`}</span>
              {name}
            </h2>
          </Animated>
          <Animated
            {...REVEAL_ANIMATION_PROPS}
            transitionDelay={300 + 50}
          >
            <p className={styles.description}>
              {description}
            </p>
          </Animated>
        </div>
        <Animated {...REVEAL_ANIMATION_PROPS}>
          <Animated
            type={ANIMATED_TYPE.isJSON}
            jsonFile={json}
            className={styles.jsonWrapper}
          />
        </Animated>
      </div>
    ))}

    <Animated
      {...REVEAL_ANIMATION_PROPS}
      transitionDelay={550}
    >
      <CallToAction
        type="card"
        title="Kickstart your dream project with us!"
        buttonTitle="Contact us"
        handleOnClick={handleOnCTAClick}
        className={styles.callToAction}
      />
    </Animated>
  </div>
);

Process.defaultProps = {
  processes: [],
  handleOnCTAClick: () => {},
};

Process.propTypes = {
  processes: PropTypes.instanceOf(Array),
  handleOnCTAClick: PropTypes.func,
};

export default Process;
