import React from 'react';
import PropTypes from 'prop-types';
import Animated from 'components/Common/Animated';
import CallToAction from 'UI/components/CallToAction';
import { ANIMATED_TYPE, REVEAL_ANIMATION_PROPS } from 'utils/constants';
import styles from './styles.module.scss';

const Process = ({ processes, handleOnCTAClick }) => (
  <div className={styles.processContainer}>
    {processes?.map(({
      name,
      description,
      json,
    }, index) => (
      <div
        className={styles.process}
        key={`processes/${name}`}
        data-index={index}
      >
        <div>
          <Animated {...REVEAL_ANIMATION_PROPS}>
            <h2 className={styles.title}>
              <span>{`${index + 1}.`}</span>
              {name}
            </h2>
          </Animated>
          <Animated
            {...REVEAL_ANIMATION_PROPS}
            transitionDelay={40}
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
      transitionDelay={50}
    >
      <CallToAction
        type="page"
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
