import React from 'react';
import { SectionTitle, Animated } from 'components';
import { animatedType } from 'utils/constants';
import { managementTeam } from './utils/data';
import styles from './styles.module.scss';

export const ManagementTeam = ({ managementTeam }) => (
  <section className={styles.managementTeam}>
    <SectionTitle title="Our management team" />
    <div className={styles.managers}>
      {managementTeam && managementTeam.map((manager, index) => (
        <Animated
          key={`special/${index}/${manager.title}`}
          type={animatedType.isCustom}
          translateY={20}
          opasityDuration={0.8}
          transformDuration={0.8}
          transitionDelay={495 + 100 * index}
        >
          <div className={styles.image} />
          <div className={styles.title}>{manager.title}</div>
          <div className={styles.subtitle}>{manager.subtitle}</div>
        </Animated>
      ))}
    </div>
  </section>
);

ManagementTeam.defaultProps = {
  managementTeam,
};
