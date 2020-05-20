import React from 'react';
// import PropTypes from 'prop-types';
import cn from 'classnames';
import { Animated } from 'components';
import { works } from './utils/data';
import styles from './styles.module.scss';

export const Portfolio = () => (
  <div className={styles.worksContainer}>
    {works.map((work, index) => (
      <div
        className={styles.work}
        key={`works/${work.name}`}
        data-index={index}
      >
        <div className={styles.desc}>
          <Animated
            delay={10}
            animateIn="fadeInUp"
            animateOnce
            offset={10}
          >
            <h1>{work.name}</h1>
            <p>{work.description}</p>
            <button type="button">See full case study</button>
          </Animated>
        </div>
        <div className={cn(styles.imgWrapper, styles.animationOfAppearanceBefore, { [styles.animationOfAppearance]: true })}>
          <Animated
            delay={700}
            animateIn="zoomIn"
            animateOnce
            offset={10}
          >
            <div style={{ backgroundImage: `url(${work.image})` }} />
          </Animated>
        </div>
      </div>
    ))}
  </div>
);
