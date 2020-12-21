import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {
  Animated,
  // TODO
  // LinkWrapper,
  // Video,
} from 'components';
import { animatedType } from 'utils/constants';
import styles from './styles.module.scss';

export const Work = ({
  refs,
  work,
  index,
}) => (
  <div
    className={styles.work}
    key={`works/${work.name}`}
    data-index={index}
    ref={refs[index + 1]}
  >
    <div className={styles.desc}>
      <Animated
        type={animatedType.isCustom}
        translateY="2.82352941em"
        opasityDuration={1}
        transformDuration={1}
        transitionDelay={50}
      >
        <h1>{work.name}</h1>
      </Animated>
      <Animated
        type={animatedType.isCustom}
        translateY="2.82352941em"
        opasityDuration={1}
        transformDuration={1}
        transitionDelay={100}
      >
        <p>{work.description}</p>
      </Animated>
      <Animated
        type={animatedType.isCustom}
        translateY="2.82352941em"
        opasityDuration={1}
        transformDuration={1}
        transitionDelay={150}
      >
        {/* TODO
         <LinkWrapper
          isLocalLink
          dynamicRouting="/"
          path="/"
          className={styles.buttonWrap}
        >
          <button type="button">See full case study</button>
        </LinkWrapper> */}
      </Animated>
    </div>
    <div className={styles.parallax}>
      <Animated type={animatedType.isParallaxSpring}>
        <div
          className={cn(
            { [styles.firstShadow]: index === 0 },
            { [styles.secondShadow]: index === 1 },
            { [styles.thirdShadow]: index === 2 },
          )}
        >
          <img src={work.preview} alt={work.preview} />
          {/* //TODO
          {work.videoName && (
            <Video src={`/videos/${work.videoName}.m4v`} className={styles.video} />
          )}
          <img src={work.image} alt={work.image} /> */}
        </div>
      </Animated>
    </div>
  </div>
);

Work.propTypes = {
  refs: PropTypes.instanceOf(Object).isRequired,
  work: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};
