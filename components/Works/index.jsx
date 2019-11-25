import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import { works } from './utils/data';

import styles from './styles.module.scss';

const Works = () => (
  <div className={styles.worksContainer}>
    {works.map(work => (
      <div className={styles.work} key={`works/${work.name}`}>
        <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
          <div className={styles.desc}>
            <h1>{work.name}</h1>
            <p dangerouslySetInnerHTML={{ __html: work.description }} />
            <button type="button">See full case study</button>
          </div>
        </ScrollAnimation>
        <div className={styles.imgWrapper}>
          <img src={work.image} alt={work.image} />
        </div>
      </div>
    ))}
  </div>
);

export default Works;
