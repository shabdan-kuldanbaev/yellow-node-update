import React from 'react';
import PropTypes from 'prop-types';
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
          translateY="2.82352941em"
          opasityDuration={1}
          transformDuration={1}
          transitionDelay={100 + 100 * index}
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

ManagementTeam.propTypes = {
  managementTeam: PropTypes.instanceOf(Array),
};
