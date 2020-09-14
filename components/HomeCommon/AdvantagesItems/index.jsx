import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'components';
import { animatedType } from 'utils/constants';
import { advantages } from './utils/data';
import styles from './styles.module.scss';

export const AdvantagesItems = ({ advantages }) => (
  <div className={styles.advantagesContainer}>
    {advantages && advantages.map((adv, index) => (
      <div className={styles.advItem} key={`advantages/${adv.title}`}>
        <Animated
          type={animatedType.isCustom}
          translateY="2.82352941em"
          opasityDuration={1}
          transformDuration={1}
          transitionDelay={100 + 100 * index}
        >
          <img src={adv.image} alt={adv.title} />
        </Animated>
        <Animated
          type={animatedType.isCustom}
          translateY="2.82352941em"
          opasityDuration={1}
          transformDuration={1}
          transitionDelay={150 + 100 * index}
        >
          <p className={styles.title}>{adv.title}</p>
        </Animated>
        <Animated
          type={animatedType.isCustom}
          translateY="2.82352941em"
          opasityDuration={1}
          transformDuration={1}
          transitionDelay={200 + 100 * index}
        >
          <p className={styles.desc} dangerouslySetInnerHTML={{ __html: adv.desc }} />
        </Animated>
      </div>
    ))}
  </div>
);

AdvantagesItems.defaultProps = {
  advantages,
};

AdvantagesItems.propTypes = {
  advantages: PropTypes.instanceOf(Array),
};
