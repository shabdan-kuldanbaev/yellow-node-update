import React from 'react';
import PropTypes from 'prop-types';
import { Animated, LinkWrapper } from 'components';
import { animatedType } from 'utils/constants';
import { processes } from './utils/data';
import styles from './styles.module.scss';

export const Process = ({ processes }) => (
  <div className={styles.processContainer}>
    {processes && processes.map((process, index) => (
      <div
        className={styles.process}
        key={`processes/${process.name}`}
        data-index={index}
      >
        <div className={styles.desc}>
          <Animated
            type={animatedType.isCustom}
            translateY="2.82352941em"
            opasityDuration={1}
            transformDuration={1}
            transitionDelay={300}
          >
            <h1>
              <span>{`${index + 1}.`}</span>
              {process.name}
            </h1>
          </Animated>
          <Animated
            type={animatedType.isCustom}
            translateY="2.82352941em"
            opasityDuration={1}
            transformDuration={1}
            transitionDelay={300 + 50}
          >
            <p>{process.description}</p>
            <LinkWrapper
              isLocalLink
              dynamicRouting={process.link}
              path={process.link}
              className={styles.buttonWrap}
            >
              <button type="button">Details</button>
            </LinkWrapper>
          </Animated>
        </div>
        <Animated
          type={animatedType.isCustom}
          translateY="2.82352941em"
          opasityDuration={1}
          transformDuration={1}
          transitionDelay={200}
        >
          <Animated
            type={animatedType.isJSON}
            jsonFile={process.json}
            className={styles.jsonWrapper}
          />
        </Animated>
      </div>
    ))}
  </div>
);

Process.defaultProps = {
  processes,
};

Process.propTypes = {
  processes: PropTypes.instanceOf(Array),
};
