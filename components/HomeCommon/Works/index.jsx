import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Work } from './Work';
import styles from './styles.module.scss';

export const Works = ({ refs, works }) => (
  <div className={styles.worksContainer}>
    {works && works.map((work, index) => (
      <Work
        key={get(work, 'fields.title', '')}
        refs={refs}
        work={work}
        index={index}
      />
    ))}
  </div>
);

Works.propTypes = {
  refs: PropTypes.instanceOf(Object).isRequired,
  works: PropTypes.instanceOf(Array).isRequired,
};
