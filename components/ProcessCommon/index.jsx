import React from 'react';
import { Animated, LinkWrapper } from 'components';
import { animatedType } from 'utils/constants';
import { processes } from './utils/data';
import styles from './styles.module.scss';

export const Process = () => (
  <div className={styles.processContainer}>
    {processes && processes.map((process, index) => (
      <div
        className={styles.process}
        key={`processes/${process.name}`}
        data-index={index}
      >
        <div className={styles.desc}>
          <Animated
            // TODO type={animatedType.isFade}
            // delay={10}
            // distance="20px"
            // bottom
            // effect="fadeInUp"

            // TODO delay={100}
            // animateIn="fadeInUp"
            // animateOnce
            // offset={10}

            type={animatedType.isCastom}
            translateY={70}
            opasityDuration={1}
            transformDuration={0.5}
            transitionDelay={300}
          >
            {/* TODO <div> */}
            <h1>
              <span>{`${index + 1}.`}</span>
              {process.name}
            </h1>
            <p>{process.description}</p>
            <LinkWrapper
              isLocalLink
              dynamicRouting={process.link}
              path={process.link}
              className={styles.buttonWrap}
            >
              <button type="button">Details</button>
            </LinkWrapper>
            {/* TODO </div> */}
          </Animated>
        </div>
        <div className={styles.imgWrapper}>
          <Animated type={animatedType.isJSON} jsonFile={process.json} />
        </div>
      </div>
    ))}
  </div>
);
