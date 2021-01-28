import React from 'react';
import PropTypes from 'prop-types';
import { SectionTitle, Animated } from 'components';
import { ANIMATED_TYPE } from 'utils/constants';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import styles from './styles.module.scss';

export const WhatMakesUsSpecial = ({ makingUsSpecial }) => {
  const { specialThings } = getDocumentFields(makingUsSpecial, ['specialThings']);

  return (
    <section className={styles.makingUsSpecial}>
      <SectionTitle title="What makes us special" />
      <div className={styles.specialThings}>
        {specialThings && specialThings.map((special, index) => {
          const { description } = getDocumentFields(special, ['description']);
          const image = getFileUrl(special);

          return (
            <Animated
              key={`special/${description}`}
              type={ANIMATED_TYPE.isCustom}
              translateY="100px"
              opasityDuration={0.8}
              transformDuration={0.8}
              transitionDelay={100 + 150 * index}
            >
              <div>
                <img src={image} alt={description} />
              </div>
              <span>{description}</span>
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
