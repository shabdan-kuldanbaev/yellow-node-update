import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { SectionTitle, Animated } from 'components';
import { animatedType } from 'utils/constants';
import styles from './styles.module.scss';

export const ManagementTeam = ({ managementTeam }) => {
  const team = get(managementTeam, 'items[0].fields.team', []);

  return (
    <section className={styles.managementTeam}>
      <SectionTitle title="Our management team" />
      <div className={styles.managers}>
        {team.length && team.map((manager, index) => {
          const name = get(manager, 'fields.name', '');
          const role = get(manager, 'fields.role', '');
          const photo = get(manager, 'fields.photo.fields.file.url', '');
          return (
            <Animated
              key={`special/${index}/${name}`}
              type={animatedType.isCustom}
              translateY="2.82352941em"
              opasityDuration={1}
              transformDuration={1}
              transitionDelay={50 + 60 * index}
            >
              <div className={styles.imageContainer}>
                <div className={styles.image} style={{ backgroundImage: `url(${photo})` }} />
              </div>
              <div className={styles.title}>{name}</div>
              <div className={styles.subtitle}>{role}</div>
            </Animated>
          );
        })}
      </div>
    </section>
  );
};

ManagementTeam.propTypes = {
  managementTeam: PropTypes.instanceOf(Array).isRequired,
};
