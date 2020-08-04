import React from 'react';
import { SectionTitle, Animated } from 'components';
import { animatedType } from 'utils/constants';
import { developFor } from './utils/data';
import styles from './styles.module.scss';

export const WeDevelopFor = ({ developFor }) => (
  <section className={styles.blockOfWeDevelopFor}>
    <div>
      <SectionTitle title="We develop for" />
      <div className={styles.developFor}>
        {developFor && developFor.map((item, index) => (
          <Animated
            key={`special/${item.title}`}
            type={animatedType.isCustom}
            translateY={100}
            opasityDuration={0.8}
            transformDuration={0.8}
            transitionDelay={100 + 150 * index}
          >
            <div className={styles.image} />
            <div className={styles.title}>{item.title}</div>
            <div className={styles.subtitle}>{item.subtitle}</div>
          </Animated>
        ))}
      </div>
    </div>
  </section>
);

WeDevelopFor.defaultProps = {
  developFor,
};
