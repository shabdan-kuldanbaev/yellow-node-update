import React from 'react';
import PropTypes from 'prop-types';
import { SectionTitle, Animated } from 'components';
import { ANIMATED_TYPE } from 'utils/constants';
import { developFor } from './utils/data';
import styles from './styles.module.scss';

export const WeDevelopFor = ({ developFor: developForList }) => (
  <section className={styles.blockOfWeDevelopFor}>
    <SectionTitle title="We develop for" />
    <div className={styles.developFor}>
      {developForList && developForList.map((item, index) => (
        <Animated
          key={`special/${item.title}`}
          type={ANIMATED_TYPE.isCustom}
          translateY="2.82352941em"
          opasityDuration={1}
          transformDuration={1}
          transitionDelay={100 + 100 * index}
        >
          <div className={styles.image} />
          <div className={styles.title}>{item.title}</div>
          <div className={styles.subtitle}>{item.subtitle}</div>
        </Animated>
      ))}
    </div>
  </section>
);

WeDevelopFor.defaultProps = {
  developFor,
};

WeDevelopFor.propTypes = {
  developFor: PropTypes.instanceOf(Array),
};
