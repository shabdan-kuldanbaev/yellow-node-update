import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import { partners } from './utils/data';

import styles from './styles.module.scss';

const Partners = () => (
  <div className={styles.partnersContainer}>
    <ScrollAnimation animateIn="fadeInUp" animateOnce offset={300}>
      <h1>and get featured on</h1>
    </ScrollAnimation>
    <div className={styles.partners}>
      {partners.map((partner, index) => (
        <ScrollAnimation
          key={`partner/${partner.title}`}
          delay={100 * index}
          animateIn="fadeInUp"
          animateOnce
          offset={300}
        >
          <div className={styles.partnersItem}>
            <img src={partner.image} alt={partner.title} />
          </div>
        </ScrollAnimation>
      ))}
    </div>
  </div>
);

export default Partners;
