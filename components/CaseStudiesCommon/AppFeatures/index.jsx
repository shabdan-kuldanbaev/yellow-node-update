import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Animated } from 'components/Common/Animated';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

const AppFeatures = ({ links, imageUrl }) => {
  const [activeName, setActiveName] = useState(links[0].name);

  const handleOnClick = (name) => {
    setActiveName(name);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sectionContainer}>
        {links && links.map(({ name, description }, index) => (
          <Animated
            key={name}
            type={ANIMATED_TYPE.isFade}
            delay={500 * index}
            duration={1000}
          >
            <div
              className={cn(styles.sectionItem, {
                [styles.sectionActiveItem]: name === activeName,
              })}
            >
              <p
                className={styles.title}
                onClick={() => handleOnClick(name)}
              >
                {name}
              </p>
              <p className={styles.description}>
                {description}
              </p>
            </div>
          </Animated>
        ))}
      </div>
      <Animated
        type={ANIMATED_TYPE.isFade}
        duration={1000}
      >
        <div>
          <img
            src={imageUrl}
            className={styles.image}
            alt=""
          />
        </div>
      </Animated>
    </div>
  );
};

AppFeatures.propTypes = {
  links: PropTypes.instanceOf(Array).isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default AppFeatures;
