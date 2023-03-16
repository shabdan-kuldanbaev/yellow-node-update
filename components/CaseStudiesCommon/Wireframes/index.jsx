import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import Illustration from 'UI/components/Illustration';
import { ANIMATION_CASE_STUDY_PROPS } from 'components/CaseStudiesCommon/utils/data';
import { getImage } from 'utils/helper';
import { IMAGE_SIZES } from './config';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const Wireframe = ({
  data: {
    images,
  },
  type,
}) => {
  const isMobileResolution = useSelector(selectIsMobileResolutions);

  if (!images) {
    return null;
  }

  return images.map((image) => {
    const imageData = getImage(image);

    const height = isMobileResolution ? 400 : IMAGE_SIZES[type] || 500;

    const scaleCoefficient = height / imageData.height;
    const width = Math.trunc(imageData.width * scaleCoefficient);

    return (
      <Animated
        key={imageData.url}
        delay={100}
        {...ANIMATION_CASE_STUDY_PROPS}
      >
        <div className={styles[type]}>
          <Illustration
            src={imageData.url}
            alt={imageData.url}
            layout="responsive"
            style={{
              minWidth: `${width}px`,
              height: `${height}px`,
            }}
            width={width}
            height={height}
            scale={2}
            containerClasses={styles.animatedContainer}
            className={styles.image}
          />
          <Illustration
            src={imageData.url}
            alt={imageData.url}
            layout="responsive"
            style={{
              minWidth: `${width}px`,
              height: `${height}px`,
            }}
            width={width}
            height={height}
            scale={2}
            containerClasses={styles.animatedContainer}
            className={styles.image}
          />
        </div>
      </Animated>
    );
  });
};

Wireframe.propTypes = {
  data: PropTypes.shape({
    images: PropTypes.instanceOf(Array),
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default Wireframe;
