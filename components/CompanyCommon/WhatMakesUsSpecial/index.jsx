import React from 'react';
import { SectionTitle, Animated } from 'components';
import { animatedType } from 'utils/constants';
import { makingUsSpecial } from './utils/data';
import styles from './styles.module.scss';

export const WhatMakesUsSpecial = ({ makingUsSpecial }) => (
  <section className={styles.makingUsSpecial}>
    <div>
      <SectionTitle title="What makes us special" />
      <div className={styles.specialThings}>
        {makingUsSpecial && makingUsSpecial.map((special, index) => (
          <Animated
            key={`special/${special.subtitle}`}
            type={animatedType.isCustom}
            translateY={100}
            opasityDuration={0.8}
            transformDuration={0.8}
            transitionDelay={495 + 150 * index}
          >
            <div>
              <img src={special.title} alt={special.subtitle} />
            </div>
            <span>{special.subtitle}</span>
          </Animated>
        ))}
      </div>
    </div>
  </section>
);

WhatMakesUsSpecial.defaultProps = {
  makingUsSpecial,
};
