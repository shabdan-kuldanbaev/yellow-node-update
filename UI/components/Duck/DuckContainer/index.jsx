import React from 'react';
import cn from 'classnames';
import Animated from 'components/Common/Animated';
import IntroText from 'components/HomeCommon/IntroText';
import DuckWrapper from 'UI/components/Duck/DuckWrapper';
import { ANIMATED_TYPE, HOMEPAGE_SLOGAN } from 'utils/constants';
import { useDuckContainer } from './utils/useDuckContainer';
import styles from './styles.module.scss';

const DuckContainer = (props) => {
  const {
    sloganRef,
    containerText,
  } = useDuckContainer(props);

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
            className={cn('letter-container', styles.slogan)}
          >
            {HOMEPAGE_SLOGAN}
          </h1>
        </Animated>
      </div>
      <IntroText className={styles.subText} />
      <DuckWrapper sloganRef={sloganRef} />
    </>
  );
};

export default DuckContainer;
