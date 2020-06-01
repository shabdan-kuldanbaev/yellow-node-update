import React from 'react';
import { Animated, LinkWrapper } from 'components';
import { animatedType } from 'utils/constants';
import { works } from './utils/data';
import styles from './styles.module.scss';

export const Portfolio = () => (
  <div className={styles.worksContainer}>
    {works.map((work, index) => (
      <div
        className={styles.work}
        key={`works/${index}`}
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
            <h1>{work.name}</h1>
            <p>{work.description}</p>
            <LinkWrapper
              isLocalLink
              dynamicRouting="/"
              path="/"
              className={styles.buttonWrap}
            >
              <button type="button">See full case study</button>
            </LinkWrapper>
            {/* TODO </div> */}
          </Animated>
        </div>
        <div className={styles.imgWrapper}>
          <Animated
            // TODO type={animatedType.isFade}
            // delay={10}
            // distance="20px"
            // bottom
            // effect="fadeInUp"

            // TODO delay={0}
            // animateIn="fadeInUp"
            // animateOnce
            // offset={10}

            type={animatedType.isCastom}
            translateY={70}
            opasityDuration={1}
            transformDuration={0.5}
            transitionDelay={370}
          >
            {/* TODO <div> */}
            <div style={{ backgroundImage: `url(${work.image})` }} />
            {/* TODO </div> */}
          </Animated>
        </div>
      </div>
    ))}
  </div>
);
