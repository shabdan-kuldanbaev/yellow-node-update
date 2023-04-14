import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { selectIsMobile } from 'redux/selectors/layout';
import { getOptimizedContentfulImage } from 'utils/helper';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const PreviewImage = ({ image }) => {
  const isMobileResolution = useSelector(selectIsMobile);

  return (
    <div className={styles.imgWrapper}>
      <Animated
        type={ANIMATED_TYPE.isCustom}
        translateY="2.82352941em"
        opasityDuration={0.8}
        transformDuration={0.8}
        transitionDelay={0}
      >
        <div style={{
          backgroundImage: `url(${getOptimizedContentfulImage(
            image,
            { width: isMobileResolution ? 530 : 1500 },
          )})`,
        }}
        />
      </Animated>
    </div>
  );
};

PreviewImage.propTypes = {
  image: PropTypes.string.isRequired,
};

export default PreviewImage;
