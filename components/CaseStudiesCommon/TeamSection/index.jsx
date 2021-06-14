import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'components/Common/Animated';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

const TeamSection = ({ members }) => (
  <Animated
    type={ANIMATED_TYPE.isFade}
    duration={1000}
  >
    <h2 className={styles.title}>
      Team
    </h2>
    {members && members.map((member) => (
      <p
        key={member}
        className={styles.teamItem}
      >
        {member}
      </p>
    ))}
  </Animated>
);

TeamSection.propTypes = {
  members: PropTypes.instanceOf(Array).isRequired,
};

export default TeamSection;
