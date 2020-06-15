import React from 'react';
import { Animated } from 'components';
import { animatedType } from 'utils/constants';
import { advantages } from './utils/data';
import styles from './styles.module.scss';

export const AdvantagesItems = () => (
  <div className={styles.advantagesContainer}>
    {advantages.map((adv, index) => (
      <div className={styles.advItem} key={`advantages/${adv.title}`}>
        <Animated
          // TODO type={animatedType.isFade}
          // delay={100 * index * 1.2}
          // distance="15px"
          // bottom
          // effect="fadeInUp"

          type={animatedType.isCustom}
          translateY={20}
          opasityDuration={0.8}
          transformDuration={0.8}
          transitionDelay={295 + 80 * index}
        >
          <img src={adv.image} alt={adv.title} />
          <Animated
            // TODO type={animatedType.isFade}
            // delay={100 * index * 1.3}
            // distance="15px"
            // bottom
            // effect="fadeInUp"

            type={animatedType.isCustom}
            translateY={20}
            opasityDuration={0.5}
            transformDuration={0.5}
            transitionDelay={300 + 80 * index}
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
