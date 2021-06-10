import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.module.scss';

const AppFeatures = ({
  links,
  imageUrl,
}) => {
  const [activeName, setActiveName] = useState(links[0].name);

  const onClick = (name) => {
    setActiveName(name);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sectionContainer}>
        {links.map((sectionInfo) => (
          <div
            key={sectionInfo.name}
            className={cn(styles.sectionItem, { [styles.sectionActiveItem]: sectionInfo.name === activeName })}
          >
            <p
              className={styles.title}
              onClick={() => onClick(sectionInfo.name)}
            >
              {sectionInfo.name}
            </p>
            <p className={styles.description}>
              {sectionInfo.description}
            </p>
          </div>
        ))}
      </div>
      <div>
        <img
          src={imageUrl}
          className={styles.image}
          alt=""
        />
      </div>
    </div>
  );
};

AppFeatures.propTypes = {
  links: PropTypes.instanceOf(Array).isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default AppFeatures;
