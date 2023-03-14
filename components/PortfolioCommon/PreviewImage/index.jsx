import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { isMobile } from 'redux/selectors/layout';
import Animated from 'components/Common/Animated';
import { getOptimizedContentfulImage } from 'utils/helper';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

const PreviewImage = ({ image }) => {
  const isMobileResolution = useSelector(isMobile);

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

PreviewImage.defaultProps = {
  isMobileResolution: false,
};

PreviewImage.propTypes = {
  image: PropTypes.string.isRequired,
  isMobileResolution: PropTypes.bool,
};

export default PreviewImage;
