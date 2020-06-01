import React from 'react';
import {
  Process,
  // TODO SectionTitle,
} from 'components';
import styles from './styles.module.scss';

const ProcessContainer = ({ introSection }) => (
  <section ref={introSection} className={styles.process}>
    {/* TODO <div className={styles.intro}>
      <SectionTitle title="How we work" subtitle="A step by step guide" />
    </div> */}
    <Process />
  </section>
);

export default ProcessContainer;
