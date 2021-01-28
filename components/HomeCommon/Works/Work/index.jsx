import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import { Animated } from 'components';
import { selectIsMobileResolutions, selectIsFullResolutions } from 'redux/selectors/layout';
import { ANIMATED_TYPE } from 'utils/constants';
import {
  getDocumentFields,
  getFileUrl,
  getOptimizedImage,
} from 'utils/helper';
import { animatedFields, imagesSizes } from './utils';
import styles from './styles.module.scss';

const Work = ({
  refs,
  work,
  index,
  animatedFields,
  isMobileResolution,
  isFullResolution,
}) => {
  const project = getDocumentFields(work);
  let sizeOfImage; // TODO rewrite it after the release

  if (isMobileResolution) sizeOfImage = index === 0 ? imagesSizes.mobileFirst : imagesSizes.mobileSecond;
  else if (isFullResolution) sizeOfImage = index === 0 ? imagesSizes.fullFirst : imagesSizes.fullSecond;

  const imageUrl = getFileUrl(project.image);
  const image = sizeOfImage ? getOptimizedImage(imageUrl, sizeOfImage, 'png', 'png8') : imageUrl;

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
        <Animated type={ANIMATED_TYPE.isParallaxSpring}>
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
  isMobileResolution: PropTypes.bool.isRequired,
  isFullResolution: PropTypes.bool.isRequired,
};

export default connect((state) => ({
  isMobileResolution: selectIsMobileResolutions(state),
  isFullResolution: selectIsFullResolutions(state),
}))(Work);
