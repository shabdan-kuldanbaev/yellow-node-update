import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const TeamSection = ({ members }) => (
  <Fragment>
    <h2 className={styles.title}>
      Team
    </h2>
    {members.map((member) => (
      <p
        key={member}
        className={styles.teamItem}
      >
        {member}
      </p>
    ))}
  </Fragment>
);

TeamSection.propTypes = {
  members: PropTypes.instanceOf(Array).isRequired,
};

export default TeamSection;
