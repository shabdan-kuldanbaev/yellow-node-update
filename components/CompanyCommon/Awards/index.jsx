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
        translateY="2.82352941em"
        opasityDuration={1}
        transformDuration={1}
        transitionDelay={100 + 100 * index}
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
