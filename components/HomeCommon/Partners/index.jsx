import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'components';
import { animatedType } from 'utils/constants';
import { partners } from './utils/data';
import styles from './styles.module.scss';

export const Partners = ({ partners }) => (
  <div className={styles.partnersContainer}>
    <Animated
      type={animatedType.isCustom}
      translateY="2.82352941em"
      opasityDuration={1}
      transformDuration={1}
      transitionDelay={100}
    >
      <div>
        <h1>And get featured on</h1>
      </div>
    </Animated>
    <div className={styles.partners}>
      {partners && partners.map((partner, index) => (
        <Animated
          key={`partner/${partner.title}`}
          type={animatedType.isCustom}
          translateY="2.82352941em"
          opasityDuration={1}
          transformDuration={1}
          transitionDelay={100 + 100 * index}
        >
          <div className={styles.partnersItem}>
            <img src={partner.image} alt={partner.title} />
          </div>
        </Animated>
      ))}
    </div>
  </div>
);

Partners.defaultProps = {
  partners,
};

Partners.propTypes = {
  partners: PropTypes.instanceOf(Array),
};
