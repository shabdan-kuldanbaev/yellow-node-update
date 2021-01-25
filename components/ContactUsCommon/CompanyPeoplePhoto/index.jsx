import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { SectionTitle, Animated } from 'components';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import { animatedType } from 'utils/constants';
import { getOptimizedImage, getFileUrl } from 'utils/helper';
import styles from './styles.module.scss';

const CompanyPeoplePhoto = ({ photo, IsMobileResolution }) => {
  const photoRef = useRef();
  const [isShow, setShow] = useState(false);
  const defaultSize = IsMobileResolution ? 530 : 1040;
  const photoUrl = getOptimizedImage(getFileUrl(photo), defaultSize);

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
            type={animatedType.isCustom}
            translateY="70px"
            opasityDuration={0.8}
            transformDuration={0.8}
            transitionDelay={0}
          >

            <LazyLoadImage src={photoUrl} alt="CompanyPeoplePhoto" effect="blur" />

            {/* <img
              ref={photoRef}
              src={photoUrl}
              alt="CompanyPeoplePhoto"
            /> */}
          </Animated>
        </div>
      </div>
    </section>
  );
};

CompanyPeoplePhoto.propTypes = {
  photo: PropTypes.instanceOf(Object).isRequired,
  IsMobileResolution: PropTypes.bool.isRequired,
};

export default connect((state) => ({
  IsMobileResolution: selectIsMobileResolutions(state),
}))(CompanyPeoplePhoto);
