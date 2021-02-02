import React from 'react';
import PropTypes from 'prop-types';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { default as Work } from './Work';
import styles from './styles.module.scss';

export const Works = ({ refs, works }) => (
  <div className={styles.worksContainer}>
    {works && works.map((work, index) => {
      const { previewImage, title, description } = getDocumentFields(
        work,
        ['previewImage', 'title', 'description'],
      );
      const imageUrl = getFileUrl(previewImage);

      return (
        <Work
          key={title}
          refs={refs}
          index={index}
          title={title}
          description={description}
          imageUrl={imageUrl}
        />
      );
    })}
  </div>
);

Works.propTypes = {
  refs: PropTypes.instanceOf(Object).isRequired,
  works: PropTypes.instanceOf(Array).isRequired,
};
