import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'components';
import { animatedType } from 'utils/constants';
import { awards } from './utils/data';
import styles from './styles.module.scss';

export const Awards = ({ awards }) => {
  const [hostname, setHost] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHost(window.location.hostname);
    }
  }, [hostname]);

  return (
    <div className={styles.awards}>
      <iframe
        id="iframe-0.824960673393011"
        src={`https://widget.clutch.co/widgets/get/1?ref_domain=${hostname}&uid=381822&ref_path=/company`}
        title="clutch-widget"
      />
      {/* {awards && awards.map((award, index) => (
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
    ))} */}
    </div>
  );
};

Awards.defaultProps = {
  awards,
};

Awards.propTypes = {
  awards: PropTypes.instanceOf(Array),
};
