import React, { useEffect, useState } from 'react';
import { mobileResolution } from 'utils/helper';
import { Animated } from 'components';
import { partners } from './utils/data';
import styles from './styles.module.scss';

export const Partners = () => {
  const [increaseTime, setIncreaseTime] = useState(5);

  useEffect(() => {
    if (window.innerWidth < mobileResolution) setIncreaseTime(1);
  }, []);

  return (
    <div className={styles.partnersContainer}>
      <Animated
        animateIn="fadeInUp"
        animateOnce
        offset={100}
      >
        <h1>And get featured on</h1>
      </Animated>
      <div className={styles.partners}>
        {partners.map((partner, index) => (
          <Animated
            key={`partner/${partner.title}`}
            delay={500 + 95 * index * increaseTime}
            animateIn="fadeInUp"
            animateOnce
            offset={130}
          >
            <div className={styles.partnersItem}>
              <img src={partner.image} alt={partner.title} />
            </div>
          </Animated>
        ))}
      </div>
    </div>
  );
};
