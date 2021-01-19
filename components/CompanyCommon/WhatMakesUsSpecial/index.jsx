import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { SectionTitle, Animated } from 'components';
import { animatedType } from 'utils/constants';
import styles from './styles.module.scss';

export const WhatMakesUsSpecial = ({ makingUsSpecial }) => {
  const specialThings = get(makingUsSpecial, 'items[0].fields.specialThings', []);

  return (
    <section className={styles.makingUsSpecial}>
      <SectionTitle title="What makes us special" />
      <div className={styles.specialThings}>
        {specialThings.length && specialThings.map((special, index) => {
          const subtitle = get(special, 'fields.description', '');
          const image = get(special, 'fields.file.url');

          return (
            <Animated
              key={`special/${subtitle}`}
              type={animatedType.isCustom}
              translateY="100px"
              opasityDuration={0.8}
              transformDuration={0.8}
              transitionDelay={100 + 150 * index}
            >
              <div>
                <img src={image} alt={subtitle} />
              </div>
              <span>{subtitle}</span>
            </Animated>
          );
        })}
      </div>
    </section>
  );
};

WhatMakesUsSpecial.propTypes = {
  makingUsSpecial: PropTypes.instanceOf(Array).isRequired,
};
