import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import Fade from 'react-reveal/Fade';
import { advantages } from './utils/data';
import styles from './styles.module.scss';

const AdvantagesItems = () => (
  <div className={styles.advantagesContainer}>
    {advantages.map((adv, index) => (
      <div className={styles.advItem} key={`advantages/${adv.title}`}>
        <ScrollAnimation
          animateIn="fadeInUp"
          animateOnce
          delay={index * 90}
        >
          <img src={adv.image} alt={adv.title} />
          <Fade bottom cascade>
            <div>
              <p className={styles.title}>{adv.title}</p>
              <p className={styles.desc} dangerouslySetInnerHTML={{ __html: adv.desc }} />
            </div>
          </Fade>
        </ScrollAnimation>
      </div>
    ))}
  </div>
);

export default AdvantagesItems;
