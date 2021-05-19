import React from 'react';
import PropTypes from 'prop-types';
import { Animated, Svg } from 'components';
import { ANIMATED_TYPE } from 'utils/constants';
import { partners } from './utils/data';
import styles from './styles.module.scss';

export const Partners = ({ partners: partnersList }) => {
  const animatedProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };

  return (
    <div className={styles.partnersContainer}>
      <Animated
        {...animatedProps}
        transitionDelay={100}
      >
        <div>
          <h1>And get featured on</h1>
        </div>
      </Animated>
      <div className={styles.partners}>
        {partnersList && partnersList.map((partner, index) => (
          <Animated
            key={`partner/${partner}`}
            {...animatedProps}
            transitionDelay={100 + 100 * index}
          >
            <Svg
              type={partner}
              className={styles.partnersItem}
            />
          </Animated>
        ))}
      </div>
    </div>
  );
};

Partners.defaultProps = {
  partners,
};

Partners.propTypes = {
  partners: PropTypes.instanceOf(Array),
};
