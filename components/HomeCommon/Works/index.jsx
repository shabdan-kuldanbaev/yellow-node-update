import React from 'react';
import PropTypes from 'prop-types';
import { getDocumentFields } from 'utils/helper';
import { default as Work } from './Work';
import styles from './styles.module.scss';

export const Works = ({ refs, works }) => (
  <div className={styles.worksContainer}>
    {works && works.map((work, index) => {
      const { title } = getDocumentFields(work, ['title']);

      return (
        <Work
          key={title}
          refs={refs}
          work={work}
          index={index}
        />
      );
    })}
  </div>
);

Works.propTypes = {
  refs: PropTypes.instanceOf(Object).isRequired,
  works: PropTypes.instanceOf(Array).isRequired,
};
