import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'components';
import { animatedType } from 'utils/constants';
import { awards } from './utils/data';
import styles from './styles.module.scss';

export const Awards = ({ awards }) => (
  <div className={styles.awards}>
    {awards && awards.map((award, index) => (
      <Animated
        key={`award/${index}`}
        type={animatedType.isCustom}
        translateY={20}
        opasityDuration={0.8}
        transformDuration={0.8}
        transitionDelay={495 + 80 * index}
      >
        <img src={award.image} alt={`award/${index}`} />
      </Animated>
    ))}
  </div>
);

Awards.defaultProps = {
  awards,
};

Awards.propTypes = {
  awards: PropTypes.instanceOf(Array),
};
