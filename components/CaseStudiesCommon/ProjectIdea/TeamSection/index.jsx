import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Animated } from 'components/Common/Animated';
import { ANIMATION_CASE_STUDY_PROPS } from 'utils/constants';
import styles from './styles.module.scss';

const TeamSection = ({ data, type }) => {
  const { title, contentList } = data;

  if (!contentList || !contentList.length) {
    return null;
  }

  return (
    <Animated {...ANIMATION_CASE_STUDY_PROPS}>
      <div className={cn(styles.container, styles[type])}>
        <h2 className={styles.title}>
          {title}
        </h2>
        {contentList.map((member) => (
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
