/* eslint-disable jsx-a11y/heading-has-content */
import React, { useRef } from 'react';
import Animated from 'components/Common/Animated';
import IntroText from 'components/HomeCommon/IntroText';
import DuckWrapper from 'components/HomeCommon/DuckContainer/DuckWrapper';
import { ANIMATED_TYPE } from 'utils/constants';
import * as styles from './styles.module.scss';

const DuckContainer = () => {
  const containerText = useRef(null);
  const sloganRef = useRef(null);

  return (
    <>
      <div
        className={styles.text}
        ref={containerText}
      >
        <Animated
          type={ANIMATED_TYPE.isParallaxSpring}
          position="absolute"
          speed={0.3}
          elementRef={containerText}
          isHomepageIntro
        >
          <h1
            ref={sloganRef}
            className="letter-container"
          />
        </Animated>
      </div>
      <IntroText className={styles.subText} />
      <DuckWrapper sloganRef={sloganRef} />
    </>
  );
};

export default DuckContainer;
