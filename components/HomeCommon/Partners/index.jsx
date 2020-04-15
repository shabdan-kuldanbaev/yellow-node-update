import React, { useEffect, useState } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import { partners } from './utils/data';
import styles from './styles.module.scss';
import { toInt } from 'utils/helper';
import { phoneResolution } from 'styles/utils/_variables.scss';

const Partners = () => {
  const [increaseTime, setIncreaseTime] = useState(5);

  useEffect(() => {
    if (window.innerWidth < toInt(phoneResolution)) setIncreaseTime(1);
  }, []);

  return (
    <div className={styles.partnersContainer}>
      <ScrollAnimation animateIn="fadeInUp" animateOnce offset={100}>
        <h1>And get featured on</h1>
      </ScrollAnimation>
      <div className={styles.partners}>
        {partners.map((partner, index) => (
          <ScrollAnimation
            key={`partner/${partner.title}`}
            delay={500 + 95 * index * increaseTime}
            animateIn="fadeInUp"
            animateOnce
            offset={130}
          >
            <div className={styles.partnersItem}>
              <img src={partner.image} alt={partner.title} />
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </div>
  );
};

export default Partners;
