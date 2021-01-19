import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import get from 'lodash/get';
import { Animated } from 'components';
import { animatedType } from 'utils/constants';
import { animatedFields } from './utils';
import styles from './styles.module.scss';

export const Work = ({
  refs,
  work,
  index,
  animatedFields,
}) => {
  const project = get(work, 'fields', {});
  const image = get(work, 'fields.image.fields.file.url', '');

  const switchRender = ({ field }, work) => {
    switch (field) {
    case 'title':
      return <h1>{project.title}</h1>;
    case 'description':
      return <p>{project.description}</p>;
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
      key={`works/${project.title}`}
      data-index={index}
      ref={refs[index + 1]}
    >
      <div className={styles.desc}>
        {animatedFields && animatedFields.map((animated) => (
          <Animated {...animated}>
            {switchRender(animated, project)}
          </Animated>
        ))}
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
            <img src={image} alt={image} />
            {/* //TODO return later
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
