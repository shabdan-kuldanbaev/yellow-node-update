import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'components/Common/Animated';
import { ANIMATION_CASE_STUDY_PROPS } from '../../utils/data';
import styles from './styles.module.scss';

const TeamSection = ({ type, data }) => {
  if (!data) {
    return null;
  }

  const { title, contentList } = data;

  return (
    <Animated {...ANIMATION_CASE_STUDY_PROPS}>
      <div className={styles[type]}>
        <h2 className={styles.title}>
          {title}
        </h2>
        {contentList && contentList.map((member) => (
          <p
            key={member}
            className={styles.teamItem}
          >
            {member}
          </p>
        ))}
      </div>
    </Animated>
  );
};

TeamSection.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
};

export default TeamSection;
