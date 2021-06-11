import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const TeamSection = ({
  members,
  description,
}) => (
  <Fragment>
    <h2 className={styles.title}>
      Team
    </h2>
    <div>
      {members.map((member) => (
        <p className={styles.name}>
          {member}
        </p>
      ))}
    </div>
    <div>
      <p className={styles.name}>
        Development
      </p>
      <p className={styles.description}>
        {description}
      </p>
    </div>
  </Fragment>
);

TeamSection.propTypes = {
  members: PropTypes.instanceOf(Array).isRequired,
  description: PropTypes.string.isRequired,
};

export default TeamSection;
