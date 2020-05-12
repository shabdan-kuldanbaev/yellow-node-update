import React from 'react';
import { Animated } from 'components';
import { advantages } from './utils/data';
import styles from './styles.module.scss';

export const AdvantagesItems = () => (
  <div className={styles.advantagesContainer}>
    {advantages.map((adv, index) => (
      <div className={styles.advItem} key={`advantages/${adv.title}`}>
        <Animated
          animateIn="fadeInUp"
          animateOnce
          delay={index * 90}
        >
          <img src={adv.image} alt={adv.title} />
          <Animated
            isFade
            bottom
            cascade
          >
            <div>
              <p className={styles.title}>{adv.title}</p>
              <p className={styles.desc} dangerouslySetInnerHTML={{ __html: adv.desc }} />
            </div>
          </Animated>
        </Animated>
      </div>
    ))}
  </div>
);
