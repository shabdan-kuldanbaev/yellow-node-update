import React from 'react';
import PropTypes from 'prop-types';
import { Animated, LinkWrapper } from 'components';
import { animatedType } from 'utils/constants';
import styles from './styles.module.scss';

export const Portfolio = ({ works }) => (
  <div className={styles.worksContainer}>
    {works && works.map((work, index) => (
      <div
        className={styles.work}
        key={`works/${work.name}`}
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
            <h1>{work.name}</h1>
          </Animated>
          <Animated
            type={animatedType.isCustom}
            translateY="2.82352941em"
            opasityDuration={1}
            transformDuration={1}
            transitionDelay={350}
          >
            <p>{work.description}</p>
          </Animated>
          <Animated
            type={animatedType.isCustom}
            translateY="2.82352941em"
            opasityDuration={1}
            transformDuration={1}
            transitionDelay={400}
          >
            <LinkWrapper
              isLocalLink
              dynamicRouting="/portfolio/[project]"
              path={`/portfolio/${work.id}`}
              className={styles.buttonWrap}
            >
              <button type="button">See full case study</button>
            </LinkWrapper>
          </Animated>
        </div>
        <div className={styles.imgWrapper}>
          <Animated
            type={animatedType.isCustom}
            translateY="2.82352941em"
            opasityDuration={1}
            transformDuration={1}
            transitionDelay={200}
          >
            <div style={{ backgroundImage: `url(${work.image})` }} />
          </Animated>
        </div>
      </div>
    ))}
  </div>
);

Portfolio.propTypes = {
  works: PropTypes.instanceOf(Array).isRequired,
};
