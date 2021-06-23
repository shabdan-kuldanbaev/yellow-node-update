import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'components/Common/Animated';
import { ANIMATED_TYPE } from 'utils/constants';
import { Figures } from './Figures';
import IntroImage from './img/img1.png';
import styles from './styles.module.scss';

export const PageIntro = () => {
  const animatedProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };

  return (
    <div className={styles.pageIntroContainer}>
      <div className={styles.pageIntroWrapper}>
        <div className={styles.pageTitleContainer}>
          <Animated {...animatedProps}>
            <h1 className={styles.pageTitle}>Custom chat app development company</h1>
          </Animated>
          <Animated {...animatedProps}>
            <p className={styles.subtitle}>
              Instant communication is highly in demand today. It’s fast, it’s easy, and it’s real-time.
              Today it is hard to imagine your life without messengers since they help you stay in touch with friends, family, or colleagues.
            </p>
          </Animated>
        </div>
        <div>
          <div
            className={styles.image}
            style={{ backgroundImage: `url(${IntroImage})` }}
            alt=""
          />
        </div>
      </div>
      <Figures />
    </div>
  );
};
