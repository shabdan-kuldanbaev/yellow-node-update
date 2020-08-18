import React from 'react';
import { Animated } from 'components';
import { animatedType } from 'utils/constants';
import { partners } from './utils/data';
import styles from './styles.module.scss';

export const Partners = () => (
  <div className={styles.partnersContainer}>
    <Animated
      // TODO type={animatedType.isFade}
      // delay={50}
      // distance="8px"
      // bottom
      // effect="fadeInUp"

      type={animatedType.isCustom}
      translateY={20}
      opasityDuration={1}
      transformDuration={1}
      transitionDelay={270}
    >
      <div>
        <h1>And get featured on</h1>
      </div>
    </Animated>
    <div className={styles.partners}>
      {partners.map((partner, index) => (
        <Animated
          // TODO type={animatedType.isFade}
          // key={`partner/${partner.title}`}
          // delay={250 + 55 * index}
          // distance="8px"
          // bottom
          // effect="fadeInUp"
          // offset={3000}

          key={`partner/${partner.title}`}
          type={animatedType.isCustom}
          translateY={20}
          opasityDuration={0.8}
          transformDuration={0.8}
          transitionDelay={300 + 100 * index}
        >
          <div className={styles.partnersItem}>
            <img src={partner.image} alt={partner.title} />
          </div>
        </Animated>
      ))}
    </div>
  </div>
);
