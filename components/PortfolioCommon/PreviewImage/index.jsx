import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { connect } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import { Animated } from 'components';
import { getOptimizedImage } from 'utils/helper';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

const PreviewImage = ({ image, isMobileResolution }) => {
  const photoRef = useRef(null);
  const [isShow, setIsShow] = useState(false);

  // TODO
  // useEffect(() => {
  //   const handlerOnScroll = () => {
  //     photoRef.current
  //       && photoRef.current.getBoundingClientRect().top < window.innerHeight / 2 + 100
  //       && setIsShow(true);
  //   };

  //   handlerOnScroll();
  //   window.addEventListener('scroll', handlerOnScroll);

  //   return () => window.removeEventListener('scroll', handlerOnScroll);
  // }, []);

  return (
    <div className={cn(styles.imgWrapper, { [styles.showPhoto]: isShow })}>
      <Animated
        type={ANIMATED_TYPE.isCustom}
        translateY="2.82352941em"
        opasityDuration={0.8}
        transformDuration={0.8}
        transitionDelay={0}
      >
        <LazyLoadImage src={getOptimizedImage(image, isMobileResolution ? 530 : 720)} effect="blur" />
      </Animated>
    </div>
  );
};

PreviewImage.propTypes = {
  image: PropTypes.string.isRequired,
  isMobileResolution: PropTypes.bool.isRequired,
};

export default connect((state) => ({
  isMobileResolution: selectIsMobileResolutions(state),
}))(PreviewImage);
