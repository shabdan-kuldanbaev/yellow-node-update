import PropTypes from 'prop-types';
import cn from 'classnames';
import get from 'lodash/get';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import Illustration from 'UI/components/Illustration';
import { getFileUrl, getOptimizedContentfulImage } from 'utils/helper';
import { ANIMATED_TYPE } from 'utils/constants';
import { selectIsMobile } from 'redux/selectors/layout';
import { ANIMATION_CASE_STUDY_PROPS } from '../utils/data';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const Images = ({
  data,
  type,
  view,
}) => {
  const isMobileResolution = useSelector(selectIsMobile);

  if (!get(data, 'images')) {
    return null;
  }

  const classes = `${type}${data.images.length}`;

  return (
    <Animated
      delay={100}
      {...ANIMATION_CASE_STUDY_PROPS}
    >
      <div className={cn(
        styles[type],
        styles[classes],
        styles[view],
      )}
      >
        {data.images.map((image, index) => {
          const imageUrl = getOptimizedContentfulImage(
            getFileUrl(image),
            {
              height: isMobileResolution ? 500 : 812,
              fm: 'png',
              fl: 'png8',
            },
          );
          const imageStyle = index ? styles.active : '';

          return (
            <Animated
              key={imageUrl}
              type={ANIMATED_TYPE.isCSS}
              intersectedClasses={imageStyle}
            >
              <Illustration
                layout="responsive"
                className={styles.image}
                src={imageUrl}
                alt={imageUrl}
              />
            </Animated>
          );
        })}
      </div>
    </Animated>
  );
};

Images.defaultProps = {
  type: 'imageContainer',
  view: '',
};

Images.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string,
  view: PropTypes.string,
};

export default Images;
