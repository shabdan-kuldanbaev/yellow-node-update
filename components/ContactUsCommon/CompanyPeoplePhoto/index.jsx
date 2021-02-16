import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import { SectionTitle, Animated } from 'components';
import { getOptimizedImage } from 'utils/helper';
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

  return (
    <section className={cn(styles.companyPeoplePhoto, { [styles.showPhoto]: isShow })}>
      <SectionTitle
        title="And come to work with us side by side"
        subtitle="We’re always happy to see you here"
        styleSubtitle={styles.subtitle}
      />
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
              src={getOptimizedImage(
                photo,
                isMobileResolution ? 530 : 1040,
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
  isMobileResolution: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({ isMobileResolution: selectIsMobileResolutions(state) }),
)(CompanyPeoplePhoto);
