import React from 'react';
import PropTypes from 'prop-types';
import Animated from 'components/Common/Animated';
import Svg from 'components/Common/Svg';
import { ANIMATED_TYPE } from 'utils/constants';
import { partners } from './utils/data';
import styles from './styles.module.scss';

const Partners = ({ partners: partnersList }) => {
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
          <h2>Our projects got featured on</h2>
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

export default Partners;
