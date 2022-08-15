import React from 'react';
import PropTypes from 'prop-types';
import LinkWrapper from 'components/Common/LinkWrapper';
import Animated from 'components/Common/Animated';
import CallToAction from 'components/Common/CallToAction';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

const Process = ({ processes, handleOnCTAClick }) => {
  const animatedProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
    percentIntersection: 0.1,
  };

  return (
    <div className={styles.processContainer}>
      {processes && processes.map(({
        name,
        description,
        link,
        json,
      }, index) => (
        <div
          className={styles.process}
          key={`processes/${name}`}
          data-index={index}
        >
          <div className={styles.desc}>
            <Animated
              {...animatedProps}
              transitionDelay={300}
            >
              <h2>
                <span>{`${index + 1}.`}</span>
                {name}
              </h2>
            </Animated>
            <Animated
              {...animatedProps}
              transitionDelay={300 + 50}
            >
              <p>{description}</p>
              <LinkWrapper
                isLocalLink
                dynamicRouting={link}
                path={link}
                className={styles.buttonWrap}
              >
                <button type="button">
                  Details
                </button>
              </LinkWrapper>
            </Animated>
          </div>
          <Animated
            {...animatedProps}
            transitionDelay={200}
          >
            <Animated
              type={ANIMATED_TYPE.isJSON}
              jsonFile={json}
              className={styles.jsonWrapper}
            />
          </Animated>
        </div>
      ))}

      <Animated
        {...animatedProps}
        transitionDelay={550}
      >
        <CallToAction
          type="card"
          title="Kickstart your dream project with us!"
          buttonTitle="Request proposal"
          handleOnClick={handleOnCTAClick}
          className={styles.callToAction}
        />
      </Animated>
    </div>
  );
};

Process.defaultProps = {
  processes: [],
  handleOnCTAClick: () => {},
};

Process.propTypes = {
  processes: PropTypes.instanceOf(Array),
  handleOnCTAClick: PropTypes.func,
};

export default Process;
