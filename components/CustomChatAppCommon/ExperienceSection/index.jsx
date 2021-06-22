import React from 'react';
import Img from './img/img2.png';
import styles from './styles.module.scss';

export const ExperienceSection = () => (
  <div className={styles.experienceSection}>
    <div>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${Img})` }}
        alt=""
      />
    </div>
    <div className={styles.experienceContent}>
      <h2 className={styles.title}>
        Experience
      </h2>
      <p className={styles.subtitle}>
        Yellow has more than five years of dedication to the development of chat apps.
      </p>
      <p className={styles.text}>
        In the process, we&apos;ve accrued vast experience in the development of secure
        and high-tech online communication systems for various industries,
        including corporate chat apps for optimized workflow, family-oriented solutions, and avenues for meeting new people.
      </p>
      <p className={styles.text}>
        If you have a great idea and want to turn it into a reality, we&apos;re the team for you! 🔥
      </p>
    </div>
  </div>
);
