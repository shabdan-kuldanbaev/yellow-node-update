import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Illustration from 'UI/components/Illustration';
import cn from 'classnames';
import { connect } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

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
            <Illustration
              layout="responsive"
              width="100%"
              height="100%"
              ref={photoRef}
              src={photo}
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
