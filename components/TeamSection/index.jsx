import React, { Fragment } from 'react';
import styles from './styles.module.scss';

const TeamSection = () => (
  <Fragment>
    <h2 className={styles.title}>
      Team
    </h2>
    <div>
      <p className={styles.accentItem}>
        Art Director
      </p>
      <p className={styles.accentItem}>
        Project manager
      </p>
      <p className={styles.accentItem}>
        UX/UI designer
      </p>
    </div>
    <div>
      <p className={styles.accentItem}>
        Development
      </p>
      <p className={styles.description}>
        Two iOS developers (One full-time, one part-time)
        Two frontend developers (full-time)
        Backend developer
      </p>
    </div>
  </Fragment>
);

export default TeamSection;
