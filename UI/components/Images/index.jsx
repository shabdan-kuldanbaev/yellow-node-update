import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import Illustration from 'UI/components/Illustration';
import { ANIMATION_CASE_STUDY_PROPS } from 'components/CaseStudiesCommon/utils/data';
import { ANIMATED_TYPE } from 'utils/constants';
import { useImages } from './utils/useImages';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const Images = (props) => {
  const {
    type,
    view,
    imagesUrl,
  } = useImages(props);

  if (!imagesUrl) {
    return null;
  }

  return (
    <Animated
      {...ANIMATION_CASE_STUDY_PROPS}
      delay={50}
    >
      <div className={cn(
        styles[type],
        styles[view],
        styles.container,
      )}
      >
        {imagesUrl?.map(({ url, alt }, index) => (
          <Animated
            key={url}
            type={ANIMATED_TYPE.isCSS}
            intersectedClasses={cn({ [styles.active]: index })}
          >
            <Illustration
              priority
              transparent
              unoptimized
              className={cn(styles.image, styles[`image-${index + 1}`])}
              unoptimized
              src={url}
              alt={alt}
            />
          </Animated>
        ))}
      </div>
    </Animated>
  );
};

Images.defaultProps = {
  type: 'imageContainer',
  view: '',
  isMobileResolution: false,
};

Images.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  isMobileResolution: PropTypes.bool,
  type: PropTypes.string,
  view: PropTypes.string,
};

export default Images;
