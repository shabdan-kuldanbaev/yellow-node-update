import React from 'react';
import PropTypes from 'prop-types';
import { SectionTitle, Animated } from 'components';
import { ANIMATED_TYPE } from 'utils/constants';
import { makingUsSpecial } from './utils/data';
import styles from './styles.module.scss';

export const WhatMakesUsSpecial = ({ makingUsSpecial }) => (
  <section className={styles.makingUsSpecial}>
    <SectionTitle title="What makes us special" />
    <div className={styles.specialThings}>
      {makingUsSpecial && makingUsSpecial.map((special, index) => (
        <Animated
          key={`special/${special.subtitle}`}
          type={ANIMATED_TYPE.isCustom}
          translateY="100px"
          opasityDuration={0.8}
          transformDuration={0.8}
          transitionDelay={100 + 150 * index}
        >
          <div>
            <img src={special.title} alt={special.subtitle} />
          </div>
          <span>{special.subtitle}</span>
        </Animated>
      ))}
    </div>
  </section>
);

WhatMakesUsSpecial.defaultProps = {
  makingUsSpecial,
};

WhatMakesUsSpecial.propTypes = {
  makingUsSpecial: PropTypes.instanceOf(Array),
};
