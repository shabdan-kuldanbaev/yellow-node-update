import React, {
  useRef,
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Animated } from 'components';
import { animatedType } from 'utils/constants';
import styles from './styles.module.scss';

export const PreviewImage = ({ image }) => {
  const photoRef = useRef(null);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const handlerOnScroll = () => {
      photoRef.current
        && photoRef.current.getBoundingClientRect().top < window.innerHeight
        && setIsShow(true);
    };

    handlerOnScroll();
    window.addEventListener('scroll', handlerOnScroll);

    return () => window.removeEventListener('scroll', handlerOnScroll);
  }, []);

  return (
    <div className={cn(styles.imgWrapper, { [styles.showPhoto]: isShow })}>
      <Animated
        type={animatedType.isCustom}
        translateY="2.82352941em"
        opasityDuration={0.8}
        transformDuration={0.8}
        transitionDelay={0}
      >
        <div ref={photoRef} style={{ backgroundImage: `url(${image})` }} />
      </Animated>
    </div>
  );
};

PreviewImage.propTypes = {
  image: PropTypes.string.isRequired,
};
