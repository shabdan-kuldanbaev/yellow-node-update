import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { isMobile } from 'redux/selectors/layout';
import Animated from 'components/Common/Animated';
import { getOptimizedContentfulImage } from 'utils/helper';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

const CompanyPeoplePhoto = ({ photo }) => {
  const photoRef = useRef();
  const [isShow, setShow] = useState(false);

  const isMobileResolution = useSelector(isMobile);

  useEffect(() => {
    const handlerOnScroll = () => {
      photoRef.current
        && photoRef.current.getBoundingClientRect().top < window.innerHeight
        && setShow(true);
    };

    handlerOnScroll();
    window.addEventListener('scroll', handlerOnScroll);

    return () => window.removeEventListener('scroll', handlerOnScroll);
  }, []);

  return photo && (
    <section className={cn(styles.companyPeoplePhoto, { [styles.showPhoto]: isShow })}>
      <div className={styles.photoContainer}>
        <div className={styles.photoWrap}>
          <Animated
            type={ANIMATED_TYPE.isCustom}
            translateY="70px"
            opasityDuration={0.8}
            transformDuration={0.8}
            transitionDelay={0}
          >
            <img
              ref={photoRef}
              src={getOptimizedContentfulImage(
                photo,
                { width: isMobileResolution ? 530 : 1500 },
              )}
              alt="CompanyPeoplePhoto"
            />
          </Animated>
        </div>
      </div>
    </section>
  );
};

CompanyPeoplePhoto.propTypes = {
  photo: PropTypes.string.isRequired,
};

export default CompanyPeoplePhoto;
