import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import { selectIsMobileResolutions, selectIsFullResolutions } from 'redux/selectors/layout';
import { Animated } from 'components';
import { ANIMATED_TYPE } from 'utils/constants';
import {
  getDocumentFields,
  getFileUrl,
  getOptimizedImage,
} from 'utils/helper';
import { FieldsWrapper } from './FieldsWrapper';
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
  const { image, title, description } = getDocumentFields(
    work,
    ['image', 'title', 'description'],
  );
  const imageUrl = getFileUrl(image);
  let sizeOfImage; // TODO rewrite it after the release
  const {
    mobileFirst,
    mobileSecond,
    fullFirst,
    fullSecond,
  } = imagesSizes;

  if (isMobileResolution) sizeOfImage = index === 0 ? mobileFirst : mobileSecond;
  else if (isFullResolution) sizeOfImage = index === 0 ? fullFirst : fullSecond;

  return (
    <div
      className={styles.work}
      key={`works/${title}`}
      data-index={index}
      ref={refs[index + 1]}
    >
      <div className={styles.desc}>
        {animatedFields && animatedFields.map((animated) => (
          <Animated {...animated}>
            <FieldsWrapper animated={animated} title={title} description={description} />
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
            <img src={sizeOfImage ? getOptimizedImage(imageUrl, sizeOfImage, 'png', 'png8') : imageUrl} alt={title} />
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
