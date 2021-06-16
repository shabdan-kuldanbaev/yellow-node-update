import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Animated } from 'components/Common/Animated';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

const TeamSection = ({ data, type }) => {
  const { title, contentList } = data;

  if (!contentList) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Animated
        type={ANIMATED_TYPE.isFade}
        duration={1000}
      >
        <h2 className={cn(styles.title, styles[type])}>
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
      </Animated>
    </div>
  );
};

TeamSection.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
};

export default TeamSection;
