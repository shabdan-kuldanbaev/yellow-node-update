import React from 'react';
import PropTypes from 'prop-types';
import { Work } from './Work';
import { works } from './utils/data';
import styles from './styles.module.scss';

export const Works = ({ refs, works }) => (
  <div className={styles.worksContainer}>
    {works && works.map((work, index) => (
      <Work
        key={work.name}
        refs={refs}
        work={work}
        index={index}
      />
    ))}
  </div>
);

Works.defaultProps = {
  works,
};

Works.propTypes = {
  refs: PropTypes.instanceOf(Object).isRequired,
  works: PropTypes.instanceOf(Array),
};
