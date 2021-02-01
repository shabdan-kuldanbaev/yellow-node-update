import React from 'react';
import PropTypes from 'prop-types';
import { SectionTitle, Animated } from 'components';
import { ANIMATED_TYPE } from 'utils/constants';
import { managementTeam } from './utils/data';
import styles from './styles.module.scss';

export const ManagementTeam = ({ managementTeam }) => (
  <section className={styles.managementTeam}>
    <SectionTitle title="Our management team" />
    <div className={styles.managers}>
      {managementTeam && managementTeam.map((manager, index) => (
        <Animated
          key={`special/${index}/${manager.title}`}
          type={ANIMATED_TYPE.isCustom}
          translateY="2.82352941em"
          opasityDuration={1}
          transformDuration={1}
          transitionDelay={50 + 60 * index}
        >
          <div className={styles.imageContainer}>
            <div className={styles.image} style={{ backgroundImage: `url(${manager.img})` }} />
          </div>
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
