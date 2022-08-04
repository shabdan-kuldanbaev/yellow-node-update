import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import Animated from 'components/Common/Animated';
import { getOptimizedContentfulImage } from 'utils/helper';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

const CompanyPeoplePhoto = ({ photo, isMobileResolution }) => {
  const photoRef = useRef();
  const [isShow, setShow] = useState(false);

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

CompanyPeoplePhoto.defaultProps = {
  isMobileResolution: false,
};

CompanyPeoplePhoto.propTypes = {
  photo: PropTypes.string.isRequired,
  isMobileResolution: PropTypes.bool,
};

export default connect(
  (state) => ({ isMobileResolution: selectIsMobileResolutions(state) }),
)(CompanyPeoplePhoto);
