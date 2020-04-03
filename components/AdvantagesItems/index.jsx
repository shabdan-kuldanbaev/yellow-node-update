import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import { advantages } from './utils/data';
import styles from './styles.module.scss';

const AdvantagesItems = () => (
  <div className={styles.advantagesContainer}>
    {advantages.map(adv => (
      <div className={styles.advItem} key={`advantages/${adv.title}`}>
        <ScrollAnimation
          animateIn="flipInX" // TODO animateIn="fadeInUp"
          animateOnce
        >
          <img src={adv.image} alt={adv.title} />
          <p className={styles.title}>{adv.title}</p>
          <p className={styles.desc} dangerouslySetInnerHTML={{ __html: adv.desc }} />
        </ScrollAnimation>
      </div>
    ))}
  </div>
);

export default AdvantagesItems;
