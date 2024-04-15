'use client';

import cn from 'classnames';
import dynamic from 'next/dynamic';
import IntroText from 'components/HomeCommon/IntroText';
import { ANIMATED_TYPE, HOMEPAGE_SLOGAN } from 'utils/constants';
import { useDuckContainer } from './utils/useDuckContainer';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));
const DuckWrapper = dynamic(() => import('UI/components/Duck/DuckWrapper'));

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
      <DuckWrapper sloganRef={sloganRef} />
      <IntroText className={styles.subText} />
    </>
  );
};

export default DuckContainer;
