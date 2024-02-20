import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { ANIMATION_CASE_STUDY_PROPS } from 'components/CaseStudiesCommon/utils/data';
import Media from 'UI/components/Media';
import { ANIMATED_TYPE } from 'utils/constants';
import { useImages } from './utils/useImages';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const Images = (props) => {
  const {
    type = 'imageContainer',
    view,
    images,
  } = useImages(props);

  if (!images) {
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
        {images?.map((asset, index) => (
          <Animated
            key={`image-${index}`}
            type={ANIMATED_TYPE.isCSS}
            intersectedClasses={cn({ [styles.active]: index })}
          >
            <Media
              priority
              transparent
              unoptimized
              asset={asset}
              className={cn(styles.image, styles[`image-${index + 1}`])}
            />
          </Animated>
        ))}
      </div>
    </Animated>
  );
};

Images.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  isMobileResolution: PropTypes.bool,
  type: PropTypes.string,
  view: PropTypes.string,
};

export default Images;
