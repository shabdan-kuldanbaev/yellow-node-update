import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {
  Animated,
} from 'components';
import { ANIMATED_TYPE } from 'utils/constants';
import { animatedFields } from './utils';
import styles from './styles.module.scss';

export const Work = ({
  refs,
  work,
  index,
  animatedFields,
}) => {
  const switchRender = ({ field }, work) => {
    switch (field) {
    case 'name':
      return <h1>{work.name}</h1>;
    case 'desc':
      return <p>{work.description}</p>;
    // TODO case 'link':
    //   return (
    //     <LinkWrapper {...animated} className={styles.buttonWrap}>
    //       <button type="button">See full case study</button>
    //     </LinkWrapper>
    //   );
    default:
      return null;
    }
  };

  return (
    <div
      className={styles.work}
      key={`works/${work.name}`}
      data-index={index}
      ref={refs[index + 1]}
    >
      <div className={styles.desc}>
        {animatedFields && animatedFields.map((animated) => (
          <Animated {...animated}>
            {switchRender(animated, work)}
          </Animated>
        ))}
      </div>
      <div className={styles.parallax}>
        <Animated type={ANIMATED_TYPE.isParallaxSpring}>
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
};

Work.defaultProps = {
  animatedFields,
};

Work.propTypes = {
  refs: PropTypes.instanceOf(Object).isRequired,
  work: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
  animatedFields: PropTypes.instanceOf(Array),
};
