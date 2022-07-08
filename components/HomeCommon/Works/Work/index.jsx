import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { selectIsMobileResolutions, selectIsFullResolutions } from 'redux/selectors/layout';
import CustomImage from 'components/Common/CustomImage';
import Animated from 'components/Common/Animated';
import { ANIMATED_TYPE } from 'utils/constants';
import { FieldsWrapper } from './FieldsWrapper';
import { animatedFields, imagesSizes } from './utils';
import styles from './styles.module.scss';

const Work = ({
  refs,
  index,
  animatedFields: animatedFieldsList,
  imageUrl,
  title,
  description,
  slug,
}) => {
  const isMobileResolution = useSelector(selectIsMobileResolutions);
  const isFullResolution = useSelector(selectIsFullResolutions);

  let sizeOfImage; // TODO rewrite it after the release
  const {
    mobileFirst,
    mobileSecond,
    fullFirst,
    fullSecond,
  } = imagesSizes;

  if (isMobileResolution) {
    sizeOfImage = index === 0
      ? mobileFirst
      : mobileSecond;
  } else if (isFullResolution) {
    sizeOfImage = index === 0
      ? fullFirst
      : fullSecond;
  }

  return (
    <div
      className={styles.work}
      key={`works/${title}`}
      data-index={index}
      ref={refs[index + 1]}
    >
      <div className={styles.desc}>
        {animatedFieldsList && animatedFieldsList.map((animated) => (
          <Animated
            {...animated}
            key={`fields/${animated.field}/${title}`}
          >
            <FieldsWrapper
              animated={animated}
              title={title}
              description={description}
              slug={slug}
            />
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
            <CustomImage
              src={imageUrl}
              alt={title}
              layout="fill"
              className={styles.img}
            />
          </div>
        </Animated>
      </div>
    </div>
  );
};

Work.defaultProps = {
  animatedFields,
  slug: '',
};

Work.propTypes = {
  refs: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
  animatedFields: PropTypes.instanceOf(Array),
  isMobileResolution: PropTypes.bool.isRequired,
  isFullResolution: PropTypes.bool.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  slug: PropTypes.string,
};

export default Work;
