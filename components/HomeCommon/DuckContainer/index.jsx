/* eslint-disable jsx-a11y/heading-has-content */
import React, {
  useEffect,
  useRef,
  Fragment,
} from 'react';
import dynamic from 'next/dynamic';
import Animated from 'components/Common/Animated';
import IntroText from 'components/HomeCommon/IntroText';
import { mobileResolution } from 'utils/helper';
import { ANIMATED_TYPE } from 'utils/constants';
import { slogan } from './utils/threeHelper';
import * as styles from './styles.module.scss';

const Duck = dynamic(() => import('./Duck'), { ssr: false });

const DuckContainer = () => {
  const containerText = useRef(null);
  const sloganRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const isMobile = window.innerWidth < mobileResolution;

    if (sloganRef.current) sloganRef.current.innerHTML = 'WE CREATE\nFANTASTIC SOFTWARE';

    slogan.animateSlogan(sloganRef);
    slogan.sloganOpacityAnimation(!isMobile ? 0.1 : 1);
  }, []);

  return (
    <Fragment>
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
      <Duck sloganRef={sloganRef} />
    </Fragment>
  );
};

export default DuckContainer;
