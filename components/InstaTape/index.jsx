import React from 'react';
import defaultImg from './images/default.png';

import styles from './styles.module.scss';

const InstaTape = () => {
  const photos = [ defaultImg, defaultImg, defaultImg, defaultImg, defaultImg ];

  return (
    <div className={styles.instaTape}>
      {photos.map((photo, index) => (
        <img
          key={`insta/${index}`}
          src={photo}
          alt="insta"
        />
      ))}
    </div>
  );
};

export default InstaTape;
